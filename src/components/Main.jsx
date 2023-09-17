import { useEffect } from "react";
import { keyframes, styled } from "styled-components";
import { useState } from "react";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { getArticleApi } from "../Actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) return;

    switch (showModal) {
      case true:
        setShowModal(false);
        break;
      case false:
        setShowModal(true);
        break;
      default:
        setShowModal(false);
    }
  };
  return (
    <>
      <Container>
        <Sharebox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <img src="/images/image-icon.png" alt="" />
              <span>Photo</span>
            </button>
            <button>
              <img src="/images/video-icon.png" alt="" />
              <span>Video</span>
            </button>
            <button>
              <img src="/images/event-icon.png" alt="" />
              <span>Event</span>
            </button>
            <button>
              <img src="/images/article-icon.png" alt="" />
              <span>Write article</span>
            </button>
          </div>
        </Sharebox>
        <Content>
          {props.loading && <img src="/images/Loading.svg" alt="" />}

          {props.articles.length > 0 ? (
            props.articles.map((article, key) => (
              <Article key={key}>
                <SharedActor>
                  <a>
                    <img src={article.actor.image} alt="" />

                    <div>
                      <span>{article.actor.titel}</span>
                      <span>{article.actor.description}</span>
                      <span>
                        {article.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                  <button>
                    <img src="/images/ellipsis-icon.png" alt="" />
                  </button>
                </SharedActor>
                <Description>{article.description}</Description>
                <SharedImage>
                  <a>
                    {!article.SharedImage && article.video ? (
                      <ReactPlayer width={"100%"} url={article.video} />
                    ) : (
                      <img src={article.shareImage} alt="" />
                    )}
                  </a>
                </SharedImage>
                <SocialCount>
                  <li>
                    <button>
                      <img src="/images/like-icon.png" alt="" />
                      <img src="/images/love-icon.png" alt="" />

                      <span>{Math.floor(Math.random() * 1000) + 1}</span>
                    </button>
                  </li>
                  <li>
                    <a>{Math.floor(Math.random() * 100)} comments</a>
                  </li>
                </SocialCount>
                <SocialAction>
                  <button>
                    <img src="/images/likeb-icon.png" alt="" />
                    <span>Like</span>
                  </button>
                  <button>
                    <img src="/images/comment-icon.png" alt="" />
                    <span>Comment</span>
                  </button>
                  <button>
                    <img src="/images/repost-icon.png" alt="" />
                    <span>Repost</span>
                  </button>
                  <button>
                    <img src="/images/send-icon.png" alt="" />
                    <span>Send</span>
                  </button>
                </SocialAction>
              </Article>
            ))
          ) : (
            <p>No Post to Show</p>
          )}
        </Content>
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const Commoncard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0/15%), 0 0 0 rgb(0 0 0/20%);
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;
const Sharebox = styled(Commoncard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      font-size: 14px;
      line-height: 1.5;
      color: rgba(0 0 0 0.6);
      min-height: 48px;
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -3px;
          width: 25px;
          height: 25px;
        }

        span {
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
`;

const Article = styled(Commoncard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: wrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

const Description = styled.div`
  overflow: hidden;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    max-height: 200px;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: left;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      border: none;
      background: transparent;
      margin-top: -1px;

      img {
        width: 15px;
        height: 15px;
      }

      span {
        font-size: 12px;
      }
    }
  }
`;

const SocialAction = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    border: none;
    background: transparent;
    font-weight: 600;
  }

  span {
    margin-left: 8px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
