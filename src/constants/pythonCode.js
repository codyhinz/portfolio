export const pythonCode = `import pygame
import random
import sys
from enum import Enum

# Initialize Pygame
pygame.init()

# Constants
GRID_SIZE = 20
CELL_SIZE = 20
WINDOW_SIZE = GRID_SIZE * CELL_SIZE
FPS = 10

# Colors
BLACK = (26, 26, 26)  # Matching the JS '#1a1a1a'
GOLD = (255, 215, 0)  # Matching the JS '#FFD700'
TAN = (199, 156, 110)  # Matching the JS '#C79C6E'
RED = (255, 0, 0)

class Direction(Enum):
    RIGHT = (1, 0)
    LEFT = (-1, 0)
    UP = (0, -1)
    DOWN = (0, 1)

class SnakeGame:
    def __init__(self):
        self.screen = pygame.display.set_mode((WINDOW_SIZE, WINDOW_SIZE))
        pygame.display.set_caption("Snake Game")
        self.clock = pygame.time.Clock()
        self.reset_game()

    def reset_game(self):
        self.snake = [[GRID_SIZE // 2, GRID_SIZE // 2]]
        self.direction = Direction.RIGHT
        self.food = self.generate_food()
        self.score = 0
        self.game_over = False

    def generate_food(self):
        while True:
            food = [
                random.randint(0, GRID_SIZE - 1),
                random.randint(0, GRID_SIZE - 1)
            ]
            if food not in self.snake:
                return food

    def handle_input(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if self.game_over:
                    self.reset_game()
                else:
                    self.handle_click(event.pos)
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_r and self.game_over:
                    self.reset_game()
        return True

    def handle_click(self, pos):
        click_x, click_y = pos
        head_x = self.snake[0][0] * CELL_SIZE + CELL_SIZE // 2
        head_y = self.snake[0][1] * CELL_SIZE + CELL_SIZE // 2
        
        dx = click_x - head_x
        dy = click_y - head_y
        
        if abs(dx) > abs(dy):
            new_dir = Direction.RIGHT if dx > 0 else Direction.LEFT
            if self.direction != Direction.LEFT and new_dir != Direction.LEFT:
                self.direction = new_dir
        else:
            new_dir = Direction.DOWN if dy > 0 else Direction.UP
            if self.direction != Direction.DOWN and new_dir != Direction.UP:
                self.direction = new_dir

    def update(self):
        if self.game_over:
            return

        # Calculate new head position
        dx, dy = self.direction.value
        new_head = [
            (self.snake[0][0] + dx) % GRID_SIZE,
            (self.snake[0][1] + dy) % GRID_SIZE
        ]

        # Check for collision with self
        if new_head in self.snake:
            self.game_over = True
            return

        self.snake.insert(0, new_head)

        # Check for food collision
        if new_head == self.food:
            self.score += 1
            self.food = self.generate_food()
        else:
            self.snake.pop()

    def draw(self):
        self.screen.fill(BLACK)

        # Draw snake
        for i, (x, y) in enumerate(self.snake):
            color = GOLD if i == 0 else TAN
            pygame.draw.rect(
                self.screen,
                color,
                (x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1)
            )

        # Draw food
        pygame.draw.rect(
            self.screen,
            RED,
            (self.food[0] * CELL_SIZE, self.food[1] * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1)
        )

        # Draw score
        if pygame.font:
            font = pygame.font.Font(None, 36)
            text = font.render(f'Score: {self.score}', True, GOLD)
            self.screen.blit(text, (10, 10))

        if self.game_over:
            font = pygame.font.Font(None, 48)
            text = font.render('Game Over!', True, GOLD)
            text_rect = text.get_rect(center=(WINDOW_SIZE // 2, WINDOW_SIZE // 2))
            self.screen.blit(text, text_rect)
            
            restart_font = pygame.font.Font(None, 36)
            restart_text = restart_font.render('Press R to Restart', True, TAN)
            restart_rect = restart_text.get_rect(center=(WINDOW_SIZE // 2, WINDOW_SIZE // 2 + 40))
            self.screen.blit(restart_text, restart_rect)

        pygame.display.flip()

    def run(self):
        running = True
        while running:
            running = self.handle_input()
            self.update()
            self.draw()
            self.clock.tick(FPS)

        pygame.quit()
        sys.exit()

if __name__ == '__main__':
    game = SnakeGame()
    game.run()`;