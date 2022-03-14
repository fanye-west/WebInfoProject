# Styles
CSS files are stored in this location. Additional nested directories can be added as required.

#### Suggested approach to CSS organisation:
CSS files can quickly become extremely long and hard to navigate, which we will want to avoid.
1. Use seperate CSS files, separated by functionality (see suggested files below). This will harm performance as it requires multiple HTTP requests to get all the files. This can be avoided by combining files into one during build, and by using a tool such as [yui compression](https://yui.github.io/yuicompressor/) to reduce the file size.
2. Clearly comment sections in each CSS file to enable other devs to navigate the file easily.

#### Suggested files
1. **main.css**: Contains general styles such as fonts, colour, fonts.
2. **components.css**: Contains reusable elements such as buttons, data entry forms, toggles
3. **layouts.css**: Contains definitions of layout elements, such as flexbox components, headers, footers
4. **data.css**: Contains definitions of data display elements