# NgNxt

ngNxt is the Angular Library for NXT (Salesforce Appexchange) App. This library is built to include the Questionnaire flow in the existing Angular App.

## Steps to build and create package

1. Clone the repository in your local machine
2. Build the nxt-app using `ng build nxt-app` command
3. Change directory from repository folder to dist/nxt-app folder
4. Create package using `npm pack` command
5. The above created package can be installed in and Angular app by below command
```
npm install <local of the .tgz extension file>
```

## Usage of the Library in the Angular App
- app.module.ts
```
import { NxtAppModule } from 'nxt-app';

imports: [
    ...,
    NxtAppModule,
    ...
],
```
- include the library as mentioned below in the component template file
`<lib-questionnaire [qbId]="<Salesforce Id of the Question Book>"></lib-questionnaire>`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).