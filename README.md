Hosted at:  https://keithrieck.github.io/sdd_speckit_bouncer/index.html

# sdd_speckit_bouncer

This trivial project was developed with [Github Spec-kit](https://github.com/github/spec-kit) and [Codex](https://chatgpt.com/codex/enterprise/).  The model I'm using is gpt-5.4 at the Medium level and standard speed.

Spec-kit is definitely overkill for this kind of app.

1. Download and setup:
    * `uvx --from git+https://github.com/github/spec-kit.git specify init sdd_speckit_bouncer`
2. $speckit-constitution
    * Creates the file `.specify/memory/constitution.md`
3. $speckit-specify Create a Progressive Web Application with a graphics demonstration showing 64 circles bouncing across the page.
    * Initializes git inside the project and creates a feature branch.
    * Creates the file `specs/001-pwa-bouncing-circles/checklists/requirements.md`
    * Creates the file `specs/001-pwa-bouncing-circles/spec.md`
    * I edit the spec and requirements documents.
4. $speckit-plan
    * Creates the file `specs/001-pwa-bouncing-circles/checklists/plan.md`
    * The plan already specifies that the language will be ES2022.  I update the plan to specify that it should user Phaser 3.x.
    * I update the data-model to specify that the circles should have a radius of 50 pixels.
5. $speckit-tasks
    * Creates the file `specs/001-pwa-bouncing-circles/tasks.md`
    