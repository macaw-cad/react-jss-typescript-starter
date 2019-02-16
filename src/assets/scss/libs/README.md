01 Settings
The settings layer contains global Sass variables (colors, font-sizes, breakpoints etc.), site-wide settings etc. You won’t find any CSS selectors and declarations here.

02 Tools
In here, you’ll find site-wide Sass mixins and Sass functions to use throughout the whole project (media-query mixin etc.). Like in the settings layer, you won’t find any CSS selectors here neither.

03 Base
As the name probably states, the base layer contains very low-specific CSS rulesets, that are affecting the whole project instead of just single elements. You most likely will not add any new code to this layer, as everything already got set up concerning this layer.

http://bradfrost.com/blog/post/atomic-web-design/ for the following sections:

10 Atoms
Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button. 

20 Molecules 
Things start getting more interesting and tangible when we start combining atoms together. Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound. These molecules take on their own properties and serve as the backbone of our design systems.

30 Organisms
Molecules give us some building blocks to work with, and we can now combine them together to form organisms. Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.

99 Helpers
This layer contains helper/utility classes. These classes usually just carry one CSS declaration which almost makes them inline styles. All declarations in this layer carry an !important.