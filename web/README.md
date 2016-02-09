#Tool Shed Front End

##Notes
Index.html contains all Angular routing mechanisms. When adding or editing page structure, please make sure to edit the index.html file accordingly.
<ul>
  <li>Angular route pulls pages using .when chains linked to two urls: View & Controller</li>
  <li>Each page needs both a view and a controller. Views go in the "views" folder; Controllers go in the "controllers" folder</li>
  <li>Please keep naming conventions constant. For a page named "home", the view should be "home.html" and the controller should be "homeCtrl.js"</li>
</ul>

Anything that goes in the navbar goes in index.html.

Currently, styles for the entire project are all in a single styles.css file. We may factor that out into multiple files if needed later.
<ul>
  <li>For now, make a region-block surrounding each page and only update styles relevant to your page to prevent potential merge conflicts.</li>
</ul>
