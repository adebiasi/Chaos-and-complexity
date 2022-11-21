"""Conway's Game of Life
More info at: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
Code created starting from https://nostarch.com/big-book-small-python-projects

the cells are declared as arrays of arrays.
"""
import copy
import pygame
import random
import sys


class CellHandler:

    def __init__(self, cols, rows):
        self.cols = cols
        self.rows = rows

    def randon_cells(self):
        next_cells = CellHandler.new(self.cols, self.rows)
        # Put random dead and alive cells into nextCells:
        for x in range(self.cols):  # Loop over every possible column.
            for y in range(self.rows):  # Loop over every possible row.
                # 50/50 chance for starting cells being alive or dead.
                next_cells[x][y] = random.randint(0, 1)

        return next_cells

    @staticmethod
    def new(cols, rows):
        return [[0 for _ in range(rows)] for _ in range(cols)]

    @staticmethod
    def copy(cells):
        return copy.deepcopy(cells)

    def update(self, cells):
        next_cells = CellHandler.new(self.cols, self.rows)

        # Calculate the next step's cells based on current step's cells:
        for x in range(self.cols):
            for y in range(self.rows):
                num_neighbors = self.count_neighbors(x, y, cells)

                # Set cell based on Conway's Game of Life rules:
                if cells[x][y] == 1 and (num_neighbors == 2 or num_neighbors == 3):
                    # Living cells with 2 or 3 neighbors stay alive:
                    next_cells[x][y] = 1
                elif cells[x][y] == 0 and num_neighbors == 3:
                    # Dead cells with 3 neighbors become alive:
                    next_cells[x][y] = 1
                else:
                    # Everything else dies or stays dead:
                    next_cells[x][y] = 0

        return next_cells

    def count_neighbors(self, x, y, cells):
        # Get the neighboring coordinates of (x, y), even if they
        # wrap around the edge:
        left = (x - 1) % self.cols
        right = (x + 1) % self.cols
        above = (y - 1) % self.rows
        below = (y + 1) % self.rows
        # Count the number of living neighbors:
        num_neighbors = 0
        if cells[left][above] == 1:
            num_neighbors += 1  # Top-left neighbor is alive.
        if cells[x][above] == 1:
            num_neighbors += 1  # Top neighbor is alive.
        if cells[right][above] == 1:
            num_neighbors += 1  # Top-right neighbor is alive.
        if cells[left][y] == 1:
            num_neighbors += 1  # Left neighbor is alive.
        if cells[right][y] == 1:
            num_neighbors += 1  # Right neighbor is alive.
        if cells[left][below] == 1:
            num_neighbors += 1  # Bottom-left neighbor is alive.
        if cells[x][below] == 1:
            num_neighbors += 1  # Bottom neighbor is alive.
        if cells[right][below] == 1:
            num_neighbors += 1  # Bottom-right neighbor is alive.
        return num_neighbors


class GraphicInterface:

    black = (0, 0, 0)
    white = (200, 200, 200)

    cell_px = 5

    def __init__(self, cols, rows):
        pygame.init()
        pygame.display.set_caption('Conway\'s Game of Life')
        pygame.event.set_allowed([pygame.QUIT])
        self.clock = pygame.time.Clock()
        self.display = pygame.display.set_mode((cols * self.cell_px, rows * self.cell_px))
        self.display.fill(self.black)

    def draw(self, cells_to_draw):
        self.display.fill(self.black)
        for x in range(len(cells_to_draw)):
            for y in range(len(cells_to_draw[x])):
                if cells_to_draw[x][y] == 1:
                    rect = pygame.Rect(x * self.cell_px, y * self.cell_px, self.cell_px, self.cell_px)
                    pygame.draw.rect(self.display, color=self.white, rect=rect, width=1)
        print(self.clock.get_fps())
        self.clock.tick(30)
        pygame.display.update()

    @staticmethod
    def listen_quit_event():
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()


def main():
    w = 300  # The width of the cell grid.
    h = 200  # The height of the cell grid.

    gi = GraphicInterface(w, h)
    ch = CellHandler(w, h)

    next_cells = ch.randon_cells()
    while True:  # Main program loop.
        gi.listen_quit_event()
        curr_cells = ch.copy(next_cells)
        gi.draw(curr_cells)
        next_cells = ch.update(curr_cells)


if __name__ == "__main__":
    main()
