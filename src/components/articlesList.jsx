import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import  {useNavigate} from "react-router-dom";
const articlesList = () => {
    const [items, setItems] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState([])

    const navigate = useNavigate();
    const linkToDetail = (id) => {
        console.log(id)
        navigate(`/news/${id}`)
    }

    useEffect(() => {
        axios.get("https://6667b7edf53957909ff50b75.mockapi.io/api/v1/list")
            .then(response => {
                setItems(response.data)
                setVisibleArticles(response.data.slice(0, 10))
            })
            .catch(error => console.log(error));
    }, [])


    const fetchMoreData = () => {

        if (visibleArticles.length >= items.length) {
            return
        }
        setTimeout(() => {
            const newVisibleArticles = items.slice(0, visibleArticles.length + 5);
            setVisibleArticles(newVisibleArticles);
        }, 500);
    }

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                fetchMoreData();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchMoreData]);
    return <>
        <div className="container-news">
            {visibleArticles.map(article => (
                <div  className="articles" key={article.id}>
                    <img onClick={()=>linkToDetail(article.id)} src={article.image} alt={article.title} />
                    <h2>{article.title}</h2>
                    <p>View:{article.view}</p>
                    <p>{article.description}</p>
                </div>
            ))}
        </div>
    </>
}
export default articlesList;
