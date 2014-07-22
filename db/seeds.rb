Article.delete_all

12.times do |i|
  Article.create!(title: "Article #{i}", body: "Body #{i}")
end
