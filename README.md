# Early Programming Work

Exercises from my first programming course (C), and a 3D desktop project built with three.js.

**Live demos:** https://anvaradylov.github.io/C-works/

## What's here

| Folder | What it is |
|---|---|
| [web/3d-desktop](web/3d-desktop) | A 3D "desktop" room built with three.js: a desk, a stack of paper notes, coloured walls, and orbit controls. The finished version is in [`Improved/`](web/3d-desktop/Improved). The plan was to add a login, creating and deleting notes, and a door to log out (see [`Req.txt`](web/3d-desktop/Req.txt)). |
| [web/countries](web/countries) | An early HTML photo gallery |
| [c-lessons](c-lessons) | C lesson tasks and assignments (strings, arrays, functions, small games such as minesweeper and guess-the-number). Each `.txt` file holds C source. |
| [materials](materials) | Course worksheets, sample exams and notes |

## Running locally

**3D desktop:** serve the folder (browsers block textures loaded from `file://`):

```bash
python -m http.server
# open http://localhost:8000/web/3d-desktop/Improved/indexTest.html
```

**C exercises:** copy the code from a lesson file into a `.c` file and compile it:

```bash
gcc lesson.c -o lesson && ./lesson
```

## Tech

C · JavaScript · three.js · HTML · CSS
