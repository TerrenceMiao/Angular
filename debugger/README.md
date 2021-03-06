# Debugger - Example how to debug Angular application in VS Code

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Debugging unit tests in VS Code

- Select `Run and Debug` in Toolbar, then select `Attach to Karma (debugger)` in drop-down list, then click GREEN run button or F5 key (Start Debuggin).
- Set breakpoint in Angular Unit Test code, then open a Termail Window and run `ng test`, or `ng test --watch=false --include src/app/app.component.spec.ts`, or `npm run test`.
- Enjoy debugging Angular source code in VS Code.

# References

- Debug Angular 12 Karma Tests in VSCode, https://medium.com/nextfaze/debug-angular-10-karma-tests-in-vscode-9685b0565e8
