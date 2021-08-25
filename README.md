# QadNx

Qad Inc. Mono repository(https://qad.com).

<p style="text-align: center;"><img src="https://www.qad.com/o/qad-theme/images/logo_letters_QAD.svg" width="450"></p>


## Tech stack
![Tech logos][stack]

- [Angular 12][angular]
- [Nx Workspace][nx]
- [ngrx][ngrx] and [ngrx/component-store][component-store]
- [TailwindCSS][tailwind] - See this video [Everything you need to know about TailwindCSS and Angular applications](https://youtu.be/zSXdJqEPy9w) by [@nartc][nartc] for integration TailwindCSS with Angular
- [Angular Material][AngularMaterial] (UI components)

[angular]: https://angular.io/
[ngrx]: https://ngrx.io/
[component-store]: https://ngrx.io/guide/component-store
[tailwind]: https://tailwindcss.com/
[AngularMaterial]: https://material.angular.io/


#EQMS

### Principles
All components are following:

- OnPush Change Detection and async pipes: all components use observable and async pipe for rendering data without any manual subscribe.
- SCAMs (single component Angular modules) for tree-shakable components, meaning each component will have a respective module. For example, a LoginComponent will have a corresponding LoginModule. We won't declare LoginComponent as part of AuthModule, for instance.
- Mostly, everything will stay in the `libs` folder. New modules, new models, new configurations, new components etc... are in libs. libs should be separated into different directories based on existing apps. We won't put them inside the apps folder. 

### Structure
```
.
└── root
    ├── apps
    │   ├── eqms
    ├── └── eqms-e2e (cypress end to end testin)
    └── libs
        └── web (dir)
            ├── shell (dir)
            │   ├── feature (angular:lib) - for configure any forRoot modules
            │   └── ui
            │       └── layout (angular:lib)
            ├── settings (dir)
            │   ├── feature (angular:lib) - for configure and persist all settings
            │   └── data-access (workspace:lib) - store and services for settings module
            ├── playlist (dir)
            │   ├── data-access (angular:lib, service, state management)
            │   ├── features
            │   │   ├── list (angular:lib PlaylistsComponent)
            │   │   └── detail (angular:lib PlaylistDetailComopnent)
            │   └── ui (dir)
            │       └── playlist-track (angular:lib, SCAM for Component)
            ├── visualizer (dir)
            │   ├── data-access (angular:lib)
            │   ├── feature
            │   └── ui (angular:lib)
            ├── home (dir)
            │   ├── data-access (angular:lib)
            │   ├── feature (angular:lib)
            │   └── ui (dir)
            │       ├── featured-playlists (angular:lib, SCAM for Component)
            │       ├── greeting (angular:lib, SCAM for Component)
            │       └── recent-played (angular:lib, SCAM for Component)
            └── shared (dir)
                ├── app-config (injection token for environment)
                ├── data-access (angular:lib, API call, Service or State management to share across the Client app)
                ├── ui (dir)
                ├── pipes (dir)
                ├── directives (dir)
                └── utils (angular:lib, usually shared Guards, Interceptors, Validators...)
                
```
### Library Types
- Feature Libraries
- UI Libraries
- Data-access Libraries

#### Feature Libraries
A feature library contains a set of files that configure a business use case or a page in an application. Most of the components in such a library are smart components that interact with data sources. This type of library also contains most of the UI logic, form validation code, etc. Feature libraries are almost always app-specific and are often lazy-loaded.

#### UI Libraries
A UI library is a collection of related presentational components. There are generally no services injected into these components (all of the data they need should come from Inputs).

#### Data-access Libraries
Data-access libraries contain code that function as client-side delegate layers to server tier APIs. All NgRx related entities (such as actions, reducers, effects or selectors) resides in this libraries

### Dependency Graph

Nx provides an [dependency graph][dep-graph-nx] out of the box. To view it on your browser, clone my repository and run:

```bash
npm run dep-graph
```

### Package Manager
pnpm

To install use this command
```npm i pnpm```

[Naming conventions](doc/naming.md)

## Setting up the development environment 🛠

- `git clone https://github.com/mparsin/qad-nx.git`
- `cd qad-nx`
- `pnpm start` for starting Angular web application
- The app should run on `http://localhost:5200/`

## Version control

### Semantic Commit Messages
Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by the OPTIONAL scope, OPTIONAL !, and REQUIRED terminal colon and space.

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)
  
References:

- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html
