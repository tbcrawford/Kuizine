# Change Log
All notable changes to Kuizine will documented in this file.

- Changes will be marked based on their impact to the project:
  - `Added` for new features.
  - `Changed` for changes in existing functionality.
  - `Deprecated` for once-stable features removed in upcoming releases.
  - `Removed` for deprecated features removed in this release.
  - `Fixed` for any bug fixes.
  - `Security` to invite users to upgrade in case of vulnerabilities.

## [Unreleased]

## [0.5.1] - 2016-03-07
### Added
- Created CHANGELOG.md and MIT LICENSE file
- Added favorites functionality

### Changed
- Moved change log from README.md to CHANGELOG.md
- Server side application files now encode data as JSON instead of pipe delimited text
- Optimized server-side SQL queries

## [0.5.0] - 2016-03-03
### Intermediate release
- Changed back button color on iOS to white
- Made the restaurant hours table wider to separate days from hours
- Reordered CSS alphabetically and by view to conform to style guidelines

## [0.4.8] - 2016-02-29
- New UI colors in nav menu
- Added drop shadow to header bar
- Added network connection error messages to login, browse, and profile views
- Disabled physical Android back button
- Fixed known logout nav menu bug where the side menu would not close
- Modified browse to look cleaner and geared towards both Android and iOS
- Localized fontawesome icons for offline use
- Modified side menu Kuizine logo colors to match font colors
- Fixed menu toggle bug that would prevent a user from being able to use the hamburger button

## [0.4.7] - 2016-02-29
- Fixed Search colors
- Added hours and phone number in profile view
- Added Menu and Website linkage
- Made back text and buttons white
- Known Bug: Call tab button does not work on iOS
- To add in future: Contact button launches external email app

## [0.4.6] - 2016-02-27
- Added home page view
- Fixed logout
- Various UI tweaks, and CSS revisions made throughout
- New color - #477d9f (blue)

## [0.4.5] - 2016-02-26
- Added primitive restaurant profile view
- Minor css revisions

## [0.4.4] - 2016-02-25
- Added logout functionality
- Revised routes.js
- Revised controllers, factories
- Include username in nav menu and reintroduced logout option in nav menu

## [0.4.3] - 2016-02-24
- Added primitive restaurant profile view functionality
- Added Naming Conventions and Coding Guidelines section to README

## [0.4.2] - 2016-02-24
- Modified controllers, now using AngularJS factories instead
- Tweaked Browse functionality, correctly links to profile page with appended http-get format

## [0.4.1] - 2016-02-23
- Updated Login and Sign Up UI
- Various UI tweaks, and CSS revisions made throughout

## [0.4.0] - 2016-02-21
- Added primitive browse functionality
- Depending on login status, display either login or logout in nav menu
- Centered and reworded error message on login page

## [0.3.1] - 2016-02-21
- UI Overhaul
- New color - #ef5350 (Light Red)
- Side menu modified to be comparable to User Interface Design Document
- Side menu items now show the current page and show the page that is 'hovered' over
- Attempt to fix header centering - currently fixed for iOS, an un-versioned push may come later to fix for Android

## [0.3.0] - 2016-02-20
- Established connection with the database
- Added primitive login functionality
- Changed back button on home to nav button after login

## [0.2.2] - 2016-02-19
- Changed back button on signup to nav button

## [0.2.1] - 2016-02-14
- Nav bar icon repositioned
- Header font increased, made thinner
- Header color changed to match backend
- Side-menu icon side increased
- Side-menu spacing between icons and text positioned correctly
- Side-menu font size changed, lightened weight

## [0.2.0] - 2016-02-12
- Template Search functionality added - Waiting for database info to query
- Template Browse functionality added - Waiting for database info to query categories

## 0.1.0 - 2016-02-05
- Base structure created
- Swipe-menu added
- Home, Search, Browse, Favorites, Login, and Signup page templates were added
- Minor CSS rules were added to enhance look and feel

[Unreleased]: https://github.com/tbcrawford/Kuizine/compare/8abc34e...HEAD
[0.5.1]: https://github.com/tbcrawford/Kuizine/compare/12f710e...8abc34e
[0.5.0]: https://github.com/tbcrawford/Kuizine/compare/eb50f78...12f710e
[0.4.8]: https://github.com/tbcrawford/Kuizine/compare/250efef...eb50f78
[0.4.7]: https://github.com/tbcrawford/Kuizine/compare/d403ea5...250efef
[0.4.6]: https://github.com/tbcrawford/Kuizine/compare/fbf799d...d403ea5
[0.4.5]: https://github.com/tbcrawford/Kuizine/compare/0751616...fbf799d
[0.4.4]: https://github.com/tbcrawford/Kuizine/compare/c7fed1d...0751616
[0.4.3]: https://github.com/tbcrawford/Kuizine/compare/6323ccc...c7fed1d
[0.4.2]: https://github.com/tbcrawford/Kuizine/compare/2643a64...6323ccc
[0.4.1]: https://github.com/tbcrawford/Kuizine/compare/fe2c1d2...2643a64
[0.4.0]: https://github.com/tbcrawford/Kuizine/compare/886b1c5...fe2c1d2
[0.3.1]: https://github.com/tbcrawford/Kuizine/compare/44f49b6...886b1c5
[0.3.0]: https://github.com/tbcrawford/Kuizine/compare/607354f...44f49b6
[0.2.2]: https://github.com/tbcrawford/Kuizine/compare/2ce8038...607354f
[0.2.1]: https://github.com/tbcrawford/Kuizine/compare/f353cee...2ce8038
[0.2.0]: https://github.com/tbcrawford/Kuizine/compare/c0bbcc6...f353cee
