/**
 * Leaderboard Updater Function
 * 
 * This function updates the global leaderboard when players
 * complete battles and gain experience.
 */

const mysql = require('mysql2/promise');

// Database configuration
let dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

// Database connection pool
let pool;

exports.handler = async (event, context) => {
  try {
    // Initialize database connection pool if not already initialized
    if (!pool) {
      pool = mysql.createPool(dbConfig);
    }
    
    // Parse the request body
    const requestBody = JSON.parse(event.toString());
    const { playerId, robotId, battleOutcome, experienceGained } = requestBody;
    
    // Validate input
    if (!playerId || !robotId || !battleOutcome) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' }),
      };
    }
    
    // Update player stats and robot experience
    const result = await updatePlayerStats(playerId, robotId, battleOutcome, experienceGained);
    
    // Get updated leaderboard
    const leaderboard = await getLeaderboard();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Leaderboard updated successfully',
        playerRank: result.playerRank,
        leaderboard,
      }),
    };
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

/**
 * Update player stats and robot experience
 * @param {string} playerId - Player ID
 * @param {string} robotId - Robot ID
 * @param {string} battleOutcome - Battle outcome ('win' or 'loss')
 * @param {number} experienceGained - Experience gained
 * @returns {Promise<Object>} Updated player stats
 */
async function updatePlayerStats(playerId, robotId, battleOutcome, experienceGained) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Update player's win/loss record
    if (battleOutcome === 'win') {
      await connection.execute(
        'UPDATE players SET wins = wins + 1, credits = credits + 200 WHERE id = ?',
        [playerId]
      );
    } else {
      await connection.execute(
        'UPDATE players SET losses = losses + 1, credits = credits + 50 WHERE id = ?',
        [playerId]
      );
    }
    
    // Update robot's experience
    await connection.execute(
      'UPDATE robots SET experience = experience + ? WHERE id = ?',
      [experienceGained, robotId]
    );
    
    // Check if robot should level up
    const [robotRows] = await connection.execute(
      'SELECT level, experience FROM robots WHERE id = ?',
      [robotId]
    );
    
    if (robotRows.length > 0) {
      const { level, experience } = robotRows[0];
      const experienceNeeded = level * 100;
      
      if (experience >= experienceNeeded) {
        // Level up the robot
        await connection.execute(
          'UPDATE robots SET level = level + 1 WHERE id = ?',
          [robotId]
        );
      }
    }
    
    // Get player's rank
    const [rankRows] = await connection.execute(
      `SELECT COUNT(*) + 1 AS rank
       FROM players
       WHERE wins > (SELECT wins FROM players WHERE id = ?)`,
      [playerId]
    );
    
    const playerRank = rankRows[0].rank;
    
    await connection.commit();
    
    return { playerRank };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * Get the current leaderboard
 * @returns {Promise<Array>} Leaderboard data
 */
async function getLeaderboard() {
  const [rows] = await pool.execute(
    `SELECT p.id, p.name, p.wins, p.losses, 
            r.id AS robotId, r.name AS robotName, r.level,
            r.stats_power AS power, r.stats_defense AS defense, 
            r.stats_speed AS speed, r.stats_energy AS energy
     FROM players p
     LEFT JOIN robots r ON p.active_robot_id = r.id
     ORDER BY p.wins DESC
     LIMIT 10`
  );
  
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    wins: row.wins,
    losses: row.losses,
    robotName: row.robotName,
    robotStats: {
      power: row.power,
      defense: row.defense,
      speed: row.speed,
      energy: row.energy
    }
  }));
}
