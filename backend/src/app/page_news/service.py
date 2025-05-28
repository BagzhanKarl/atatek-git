from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from src.app.page_news.models import PageNews, PageNewsCommets
from src.app.page_news.schemas import CreatePageNews, CreatePageNewsComment, PageNewsResponse, PageNewsCommentResponse

class PageNewsService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_news(self, news_data: CreatePageNews) -> PageNewsResponse:
        news = PageNews(
            page_id=news_data.page_id,
            title=news_data.title,
            poster=news_data.poster,
            content=news_data.content
        )
        self.db.add(news)
        await self.db.commit()
        await self.db.refresh(news)
        return PageNewsResponse.model_validate(news)

    async def get_news_by_id(self, news_id: int) -> PageNewsResponse:
        query = select(PageNews).where(PageNews.id == news_id)
        result = await self.db.execute(query)
        news = result.scalar_one_or_none()
        if not news:
            raise Exception("News not found")
        return PageNewsResponse.model_validate(news)

    async def get_news_by_page_id(self, page_id: int) -> list[PageNewsResponse]:
        query = select(PageNews).where(PageNews.page_id == page_id)
        result = await self.db.execute(query)
        news_list = result.scalars().all()
        return [PageNewsResponse.model_validate(news) for news in news_list]

    async def update_news(self, news_id: int, news_data: CreatePageNews) -> PageNewsResponse:
        query = update(PageNews).where(PageNews.id == news_id).values(
            title=news_data.title,
            poster=news_data.poster,
            content=news_data.content
        )
        await self.db.execute(query)
        await self.db.commit()
        return await self.get_news_by_id(news_id)

    async def delete_news(self, news_id: int) -> bool:
        query = delete(PageNews).where(PageNews.id == news_id)
        await self.db.execute(query)
        await self.db.commit()
        return True

    async def create_comment(self, comment_data: CreatePageNewsComment, user_id: int) -> PageNewsCommentResponse:
        comment = PageNewsCommets(
            page_news_id=comment_data.page_news_id,
            user_id=user_id,
            comment=comment_data.comment
        )
        self.db.add(comment)
        await self.db.commit()
        await self.db.refresh(comment)
        return PageNewsCommentResponse.model_validate(comment)

    async def get_comments_by_news_id(self, news_id: int) -> list[PageNewsCommentResponse]:
        query = select(PageNewsCommets).where(PageNewsCommets.page_news_id == news_id)
        result = await self.db.execute(query)
        comments = result.scalars().all()
        return [PageNewsCommentResponse.model_validate(comment) for comment in comments]

    async def delete_comment(self, comment_id: int) -> bool:
        query = delete(PageNewsCommets).where(PageNewsCommets.id == comment_id)
        await self.db.execute(query)
        await self.db.commit()
        return True 