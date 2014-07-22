// Pattern used to define a namespace
var Blog = Blog || {};

// Article constructor function
Blog.Article = function(id, title, body){
  this.id = id;
  this.title = title;
  this.body = body;
};

Blog.Article.prototype = {
  // Method to generate html for one article
  html: function() {
    var articleHTML = '<li id=article_' + this.id + '>' + this.title;
    articleHTML += '<div>' + this.body + '</div>';
    articleHTML += '</li>';

    return articleHTML;
  }
};
