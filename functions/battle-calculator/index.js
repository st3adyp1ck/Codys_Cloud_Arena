/**
 * Battle Calculator Function
 * 
 * This function calculates the outcome of battles between robots
 * based on their stats and the moves chosen by the player.
 */

exports.handler = async (event, context) => {
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.toString());
    const { playerRobot, enemyRobot, playerMove } = requestBody;
    
    // Validate input
    if (!playerRobot || !enemyRobot || !playerMove) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' }),
      };
    }
    
    // Calculate battle outcome
    const result = calculateBattleOutcome(playerRobot, enemyRobot, playerMove);
    
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error processing battle calculation:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

/**
 * Calculate the outcome of a battle move
 * @param {Object} playerRobot - Player's robot
 * @param {Object} enemyRobot - Enemy robot
 * @param {Object} playerMove - Player's move
 * @returns {Object} Battle outcome
 */
function calculateBattleOutcome(playerRobot, enemyRobot, playerMove) {
  // Get robot stats
  const playerStats = playerRobot.stats;
  const enemyStats = enemyRobot.stats;
  
  // Calculate damage based on move type
  let playerDamage = 0;
  let enemyDamage = 0;
  let log = [];
  
  switch (playerMove.type) {
    case 'attack':
      // Player's attack move
      playerDamage = calculateAttackDamage(playerStats.power, enemyStats.defense);
      log.push(`Your robot attacks with ${playerMove.description} for ${playerDamage} damage!`);
      break;
      
    case 'defend':
      // Player's defend move
      playerDamage = calculateDefenseDamage(playerStats.defense, enemyStats.power);
      log.push(`Your robot defends with ${playerMove.description}, reducing incoming damage!`);
      break;
      
    case 'special':
      // Player's special move
      playerDamage = calculateSpecialDamage(playerStats.power, playerStats.energy, enemyStats.defense);
      log.push(`Your robot uses special move ${playerMove.description} for ${playerDamage} damage!`);
      break;
      
    default:
      log.push('Invalid move type');
  }
  
  // Calculate enemy's counter move
  const enemyMoveType = determineEnemyMove(enemyStats, playerMove.type);
  
  switch (enemyMoveType) {
    case 'attack':
      enemyDamage = calculateAttackDamage(enemyStats.power, playerStats.defense);
      log.push(`Enemy robot attacks for ${enemyDamage} damage!`);
      break;
      
    case 'defend':
      enemyDamage = calculateDefenseDamage(enemyStats.defense, playerStats.power);
      log.push('Enemy robot defends, reducing incoming damage!');
      break;
      
    case 'special':
      enemyDamage = calculateSpecialDamage(enemyStats.power, enemyStats.energy, playerStats.defense);
      log.push(`Enemy robot uses a special move for ${enemyDamage} damage!`);
      break;
  }
  
  return {
    playerDamage,
    enemyDamage,
    log,
  };
}

/**
 * Calculate damage for an attack move
 * @param {number} attackerPower - Attacker's power stat
 * @param {number} defenderDefense - Defender's defense stat
 * @returns {number} Damage amount
 */
function calculateAttackDamage(attackerPower, defenderDefense) {
  // Base damage is attacker's power
  let damage = attackerPower;
  
  // Reduce damage based on defender's defense (diminishing returns)
  const damageReduction = defenderDefense / (defenderDefense + 50);
  damage = Math.round(damage * (1 - damageReduction));
  
  // Add some randomness (±20%)
  const randomFactor = 0.8 + Math.random() * 0.4;
  damage = Math.round(damage * randomFactor);
  
  // Ensure minimum damage
  return Math.max(1, damage);
}

/**
 * Calculate damage for a defense move
 * @param {number} defenderDefense - Defender's defense stat
 * @param {number} attackerPower - Attacker's power stat
 * @returns {number} Damage amount
 */
function calculateDefenseDamage(defenderDefense, attackerPower) {
  // Defense moves reduce damage significantly
  let damage = attackerPower * 0.4;
  
  // Reduce damage based on defender's defense (diminishing returns)
  const damageReduction = defenderDefense / (defenderDefense + 30);
  damage = Math.round(damage * (1 - damageReduction));
  
  // Add some randomness (±10%)
  const randomFactor = 0.9 + Math.random() * 0.2;
  damage = Math.round(damage * randomFactor);
  
  // Ensure minimum damage
  return Math.max(0, damage);
}

/**
 * Calculate damage for a special move
 * @param {number} attackerPower - Attacker's power stat
 * @param {number} attackerEnergy - Attacker's energy stat
 * @param {number} defenderDefense - Defender's defense stat
 * @returns {number} Damage amount
 */
function calculateSpecialDamage(attackerPower, attackerEnergy, defenderDefense) {
  // Special moves use both power and energy
  let damage = attackerPower * 0.7 + attackerEnergy * 0.5;
  
  // Reduce damage based on defender's defense (diminishing returns)
  const damageReduction = defenderDefense / (defenderDefense + 70);
  damage = Math.round(damage * (1 - damageReduction));
  
  // Add some randomness (±30%)
  const randomFactor = 0.7 + Math.random() * 0.6;
  damage = Math.round(damage * randomFactor);
  
  // Ensure minimum damage
  return Math.max(2, damage);
}

/**
 * Determine the enemy's move based on its stats and the player's move
 * @param {Object} enemyStats - Enemy robot's stats
 * @param {string} playerMoveType - Type of move the player used
 * @returns {string} Enemy move type
 */
function determineEnemyMove(enemyStats, playerMoveType) {
  // Simple AI logic to determine the enemy's move
  const moveTypes = ['attack', 'defend', 'special'];
  
  // Weights for each move type
  let weights = {
    attack: 0.4,
    defend: 0.3,
    special: 0.3,
  };
  
  // Adjust weights based on enemy stats
  if (enemyStats.power > 70) {
    weights.attack += 0.2;
    weights.defend -= 0.1;
    weights.special -= 0.1;
  }
  
  if (enemyStats.defense > 70) {
    weights.defend += 0.2;
    weights.attack -= 0.1;
    weights.special -= 0.1;
  }
  
  if (enemyStats.energy > 70) {
    weights.special += 0.2;
    weights.attack -= 0.1;
    weights.defend -= 0.1;
  }
  
  // Adjust weights based on player's move
  if (playerMoveType === 'attack') {
    weights.defend += 0.1;
  } else if (playerMoveType === 'defend') {
    weights.special += 0.1;
  } else if (playerMoveType === 'special') {
    weights.attack += 0.1;
  }
  
  // Normalize weights
  const totalWeight = weights.attack + weights.defend + weights.special;
  weights.attack /= totalWeight;
  weights.defend /= totalWeight;
  weights.special /= totalWeight;
  
  // Choose move based on weights
  const random = Math.random();
  if (random < weights.attack) {
    return 'attack';
  } else if (random < weights.attack + weights.defend) {
    return 'defend';
  } else {
    return 'special';
  }
}
