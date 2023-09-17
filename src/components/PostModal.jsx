import { useState } from "react";
import { styled } from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { postArticleApi } from "../Actions";

const PostModal = (props) => {
  const [EditorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Not an Image, the file is of type ${typeof image}`);
      return;
    }

    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: EditorText,
      timestamp: Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };
  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    props.handleClick(e);
  };
  return (
    <>
      {props.showModal === true && (
        <Container>
          <Content>
            <Header>
              <h2>Create a Post</h2>
              <button onClick={reset}>
                <img src="/images/close-icon.png" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{props.user ? props.user.displayName : "Name"}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={EditorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What's on your Mind?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpg, image/png, image/jpeg"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an Image to Share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Share the Video link to Share"
                        value={videoLink}
                        onChange={(e) => {
                          setVideoLink(e.target.value);
                        }}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>

              <ShareCreation>
                <AttachAssets>
                  <AssetButton onClick={() => switchAssetArea("image")}>
                    <img src="/images/image-icon.png" alt="" />
                  </AssetButton>
                  <AssetButton onClick={() => switchAssetArea("media")}>
                    <img src="/images/video-icon.png" alt="" />
                  </AssetButton>
                </AttachAssets>
                <ShareComment>
                  <AssetButton>
                    <img src="/images/comment-icon.png" alt="" />
                    Anyone
                  </AssetButton>
                </ShareComment>
                <PostButton
                  disabled={
                    !EditorText && !shareImage && !videoLink ? true : false
                  }
                  onClick={(event) => {
                    postArticle(event);
                  }}
                >
                  Post
                </PostButton>
              </ShareCreation>
            </SharedContent>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16;
  line-height: 1.5;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 25px;
    width: 25px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    outline: none;
    background-color: transparent;

    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background-color: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.4);
  height: 30px;
  color: rgba(0, 0, 0, 0.5);
  min-width: auto;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0px 3px;

  img {
    width: 20px;
    height: 20px;
  }
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;

  ${AssetButton} {
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    font-size: 13px;
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${(props) =>
    props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2"};
  color: white;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(0,0,0,0.4)" : "#004182"};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  color: #0a66c2;
  img {
    width: 100%;
    height: 100%;
    max-height: 200px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleApi(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
