import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "axios";
import ReactMarkdown from 'react-markdown'



export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const {_id} = useParams();
  React.useEffect(()=>{
    axios.get(`posts/${_id}`).then(res =>{
      setData(res.data);
      setLoading(false);
    }).catch((err)=> {
      console.warn(err);
      alert('Ошибка при получении статьи')
    });
  }, []);

  if  (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
  return (
    <>
      <Post
         _id={data._id}
         title={data.title}
         imageUrl={data.imageUrl ? ` process.env.REACT_APP_API_URL${data.imageUrl}`:''}
         //imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
         user={data.user}
         createdAt={data.createdAt}
         viewsCount={data.viewsCount}
         commentsCount={3}
         tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children = {data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Петров",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Хорошая коллекция",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "В целом очень хорошее впечатление от коллекции.Надеюсь на дальнейшее и плодотворное сотрудничество.Хочется пожелать процветания и новых идей",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
