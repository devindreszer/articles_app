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
end
