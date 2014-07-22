class ArticlesController < ApplicationController
  def default_serializer_options
    { root: false }
  end

  # ONLY respond to requests for JSON
  respond_to :json

  def index
    @articles = Article.all

    # like a render json: @articles
    respond_with(@articles)
  end

  def show
    @article = Article.find(params[:id])
    respond_with @article
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      respond_with(@article)
    else
      respond_with(@article.errors)
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :body)
  end
end
