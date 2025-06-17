import NewsCard from "./news-card";
import PopularPeople from "./popular-people";


export default function MainNews() {
    return (
        <div className="mt-10">
            <h1 className="text-3xl font-bold">Жарты жаңалықтары</h1>

            <div className="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-3">
                <div className="lg:col-span-2 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                </div>
                <div className="lg:col-start-3 rounded-lg p-4 min-h-[300px]">
                    <div className="flex flex-col gap-4 sticky top-20">
                        <div className="flex flex-col gap-2">
                            
                            <PopularPeople />
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}