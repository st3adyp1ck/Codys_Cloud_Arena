-- Database schema for Cody's Cloud Arena
-- To be deployed on Alibaba Cloud RDS

-- Create database
CREATE DATABASE IF NOT EXISTS codys_cloud_arena;
USE codys_cloud_arena;

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  credits INT NOT NULL DEFAULT 1000,
  wins INT NOT NULL DEFAULT 0,
  losses INT NOT NULL DEFAULT 0,
  active_robot_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Robots table
CREATE TABLE IF NOT EXISTS robots (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  owner_id VARCHAR(36) NOT NULL,
  level INT NOT NULL DEFAULT 1,
  experience INT NOT NULL DEFAULT 0,
  stats_power INT NOT NULL DEFAULT 50,
  stats_defense INT NOT NULL DEFAULT 50,
  stats_speed INT NOT NULL DEFAULT 50,
  stats_energy INT NOT NULL DEFAULT 50,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES players(id) ON DELETE CASCADE
);

-- Robot parts table
CREATE TABLE IF NOT EXISTS robot_parts (
  id VARCHAR(36) PRIMARY KEY,
  robot_id VARCHAR(36) NOT NULL,
  part_type ENUM('head', 'body', 'arms', 'legs') NOT NULL,
  part_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (robot_id) REFERENCES robots(id) ON DELETE CASCADE,
  UNIQUE KEY unique_robot_part (robot_id, part_type)
);

-- Battles table
CREATE TABLE IF NOT EXISTS battles (
  id VARCHAR(36) PRIMARY KEY,
  player_id VARCHAR(36) NOT NULL,
  player_robot_id VARCHAR(36) NOT NULL,
  enemy_robot_id VARCHAR(36) NOT NULL,
  outcome ENUM('win', 'loss') NOT NULL,
  experience_gained INT NOT NULL,
  credits_earned INT NOT NULL,
  battle_log JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY (player_robot_id) REFERENCES robots(id) ON DELETE CASCADE
);

-- Add foreign key constraint to players table
ALTER TABLE players
ADD CONSTRAINT fk_active_robot
FOREIGN KEY (active_robot_id) REFERENCES robots(id) ON DELETE SET NULL;

-- Create indexes
CREATE INDEX idx_players_wins ON players(wins DESC);
CREATE INDEX idx_robots_owner ON robots(owner_id);
CREATE INDEX idx_battles_player ON battles(player_id);

-- Create a view for the leaderboard
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  p.id,
  p.name,
  p.wins,
  p.losses,
  r.id AS robot_id,
  r.name AS robot_name,
  r.level,
  r.stats_power,
  r.stats_defense,
  r.stats_speed,
  r.stats_energy
FROM 
  players p
LEFT JOIN 
  robots r ON p.active_robot_id = r.id
ORDER BY 
  p.wins DESC, p.losses ASC, p.id ASC;
