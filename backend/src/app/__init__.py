from src.app.db.views import router as db_router

def init_app(app):
    app.include_router(db_router, prefix="/db", tags=["db"])
    return app

