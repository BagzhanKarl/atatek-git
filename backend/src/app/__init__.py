from src.app.db.views import router as db_router
from src.app.address.views import router as address_router
from src.app.auth.views import router as auth_router
from src.app.family.views import router as family_router
from src.app.tree.views import router as tree_router
from src.app.ticket.views import router as ticket_router
from src.app.pages.views import router as pages_router


def init_app(app):
    app.include_router(auth_router, prefix="/auth", tags=["auth"])
    app.include_router(address_router, prefix="/address", tags=["address"])
    app.include_router(tree_router, prefix="/tree", tags=["tree"])
    app.include_router(ticket_router, prefix="/ticket", tags=["ticket"])
    app.include_router(family_router, prefix="/family", tags=["family"])
    app.include_router(pages_router, prefix="/pages", tags=["pages"])
    app.include_router(db_router, prefix="/db", tags=["db"])
    return app

