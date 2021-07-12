from silence.decorators import endpoint

@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM categories"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/categories/$category",
    method="GET",
    sql="SELECT * FROM categories WHERE category = $category"
)
def get_by_category():
    pass

###############################################################################

@endpoint(
    route="/categories/category/$categoryId",
    method="GET",
    sql="SELECT * FROM categories WHERE categoryId = $categoryId"
)
def get_by_categoryId():
    pass

###############################################################################

@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO categories (category) VALUES ($category)",
    description="Creates a new category",
    auth_required=False,
)
def create(category):
    pass

###############################################################################

@endpoint(
    route="/categories/$categoryId",
    method="PUT",
    sql="UPDATE categories SET category = $category WHERE categoryId = $categoryId",
    description="Updates an existing category",
    auth_required=True
)
def update(category):
    pass
