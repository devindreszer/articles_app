var Blog = Blog || {};

Blog.ArticleList = {

  // Ajax callback handler and set the JSON data to the variable articles
  articlesCallbackHandler: function(articles) {
    // Initialize an empty string for the list of articles
    var articleHTML = "", newArticle;

    // 3. Calculate the number of articles returned by the server in the success callback.
    this.count = articles.length;

    // Loop through all articles
    articles.forEach(function(article){
      // Create a new instance of the article object
      // pass it id, title, and body
      newArticle = new Blog.Article(article.id, article.title, article.body);

      // Call the html function on the article object and add it to the article list string
      articleHTML += newArticle.html();
    });

    // Empty the article list
    this.articleListElem.empty();

    // Append the string from this function to the article list
    this.articleListElem.append(articleHTML);
  },

  // Button click handler
  getArticles: function() {

    this.count = 0;

    // Fires off HTTP GET to the backend
    $.ajax({
      url: "http://localhost:3000/articles"
    })
    // Upon success enter the callback handler
    .done(this.articlesCallbackHandler.bind(this))
    // Show the number of articles on the page.
    .done(function(){
      this.articleCountElem.html("<p> " + this.count + " Articles</p>");
    }.bind(this));
  },

  addArticleToList: function(article) {
    var newArticle = new Blog.Article(article.id, article.title, article.body),
      articleHTML = newArticle.html();
    this.articleListElem.append(articleHTML);
    this.count += 1;
  },

  createArticle: function(event) {
    var $form = $(event.target),
      $title = $form.find("input[name='title']"),
      $body = $form.find("input[name='body']"),
      newArticle = { article: { title: $title.val(), body: $body.val() }};

    $title.val("");
    $body.val("");

    event.preventDefault();
    $.ajax({
      url: "http://localhost:3000/articles",
      type: "POST",
      data: newArticle,
    })
    .done(this.addArticleToList.bind(this))
    .done(function(){
      this.articleCountElem.html("<p> " + this.count + " Articles</p>");
    }.bind(this));
  },

  // Initialize variables and all event handlers
  init: function(getArticlesID, articlesID, articleCountID) {
    this.getArticlesButton = $(getArticlesID);
    this.articleListElem = $(articlesID);

    // Create a reference to the div for article count
    this.articleCountElem = $(articleCountID);

    // 1. Create a global article and set it to 0
    this.count = 0;

    // Click handler to get all articles; and binding this to the object
    this.getArticlesButton.click(this.getArticles.bind(this));

    // Automatically click the get articles button upon page load
    this.getArticlesButton.trigger('click');

    $('#new-article').on('submit', this.createArticle.bind(this));
  }
};
