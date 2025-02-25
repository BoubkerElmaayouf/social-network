"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThumbsUp,
    faThumbsDown,
    faComment,
    faClock,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { fetchUserInfo } from "@/utilis/fetching_data.js";
import { useEffect, useState,useRef, use } from "react";
import "./css/display_post.css"
import Image from "next/image";


//****************** Create Post Component: a function that displays a single post ***********************/

export function Post({ post }) {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(post.likes);
  const [comment, setNewComment] = useState("");
  const [dislikes, setDislikes] = useState(post.dislikes);

  const [formComments, setCommentData] = useState({
    postId: "",
    content: "",
  });

  const [userdata, setUserdata] = useState(null);
    useEffect(() => {
      async function getUserData() {
        const userdata = await fetchUserInfo("api/users/info");
        setUserdata(userdata); // Store the user data in state
      }
      getUserData();
    }, []);


  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!formComments.content.trim()) return;
    const newCommentForm = new FormData();
    newCommentForm.append("post_id", formComments.postId);
    newCommentForm.append("content", formComments.content);
    try {
      const response = await fetch("http://localhost:8080/api/comment/add", {
          method: "POST",
          credentials: "include",
          headers: {
              // "Content-Type": "application/json",
          },
          body: newCommentForm, 
      });
      if (response.status === 201) {
        setCommentData({
          postId: "",
          content: "",
        });
      } else {
        console.log(response.status);
      }

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await response.json();
      console.log(data);
      
      setComments([data, ...comments]);
      setNewComment("");  





      // Mise à jour locale des commentaires
      // setComments([comment, ...comments]);
      // setNewComment("");
  } catch (error) {
      console.error("Error submitting comment:", error);
  }

    // setComments([comment, ...comments]);
    // setNewComment("");
  };

  const handleRect = async (Id, type) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reactPost/add`, {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ post_id: Id, reaction_type: type }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setDislikes(data.dislike_count);
        setLikes(data.like_count );
      } else {
        console.log("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const getComments = async (postId) => {
    try {
      const response = await fetchUserInfo(`/api/comment/get?PostId=${postId}`); 
      if (response) {
        setComments(response);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  return (
    <article className="post">
      <div className="post-header">
        <div className="post-user-info">
          <div className="user-avatar">
            <img
              src={ 
                  post.creator?.avatar 
                  ? `http://localhost:8080/images?path=${post.creator.avatar}`
                  : "/default-img.jpg"
              }
              alt="User avatar"
              width={40}
              height={40}
              className="avatar-image"
            />
          </div>
          <div className="user-details">
            <h3 className="user-name">
              {post.creator?.first_name + " " + post.creator?.last_name}
            </h3>
            <span className="post-timestamp">
              <FontAwesomeIcon icon={faClock} />
              <time>{post?.created_at}</time>
            </span>
          </div>
        </div>
      </div>

      <div className="post-content">
        <h2 className="post-title">{post?.title || "loading title..."}</h2>
        <p className="post-text">{post?.content || "loading content..."}</p>
        {post?.image && (
          <div className="post-image">
            <img
              src={`http://localhost:8080/images?path=${post.image}`}
              alt="Post image"
              className="post-image01"
            />
          </div>
        )}
      </div>

      <div className="post-actions">
        <button onClick={() => handleRect(post.id, "LIKE")} className="action-button">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{likes}</span>
        </button>
        <button onClick={() => handleRect(post.id, "DISLIKE")} className="action-button">
          <FontAwesomeIcon icon={faThumbsDown} />
          <span>{dislikes}</span>
        </button>
        <button
          className="action-button"
          onClick={() => {
            getComments(post.id);
            setIsCommentSectionOpen(!isCommentSectionOpen);
          }}
        >
          <FontAwesomeIcon icon={faComment} />
          <span>{comments.length}</span>
        </button>
      </div>

      {isCommentSectionOpen  && (
        <div className="comments-section">
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <div className="user-avatar">
              <img
                src={`http://localhost:8080/images?path=${userdata?.avatar}`}
                alt="Your avatar"
                width={32}
                height={32}
                className="avatar-image"
              />
            </div>
            <input
              type="text"
              className="comment-input"
              placeholder="Write a comment..."
              value={formComments.content}
              onChange={(e) => setCommentData({
                postId: post.id,
                content: e.target.value
            })}
            
            />
            <button
              type="submit"
              className="comment-submit"
              disabled={!formComments.content.trim()}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <div className="user-avatar">
                    <img
                      src={`http://localhost:8080/images?path=${comment.user?.avatar}`}
                      alt="Commenter avatar"
                      width={32}
                      height={32}
                      className="avatar-image"
                    />
                  </div>
                  <div className="comment-details">
                    <span className="comment-author">{comment.user?.first_name + " " + comment.user?.last_name}</span>
                    <span className="comment-timestamp">
                      <FontAwesomeIcon icon={faClock} />
                      <time>{comment.created_at}</time>
                    </span>
                  </div>
                </div>
                <p className="comment-content">{comment?.content}</p>
                <div className="comment-actions">
                  <button className="action-button">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="action-button">
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <span>{comment.dislikes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

// ************** Post list: a function that displays a list of posts ****************//
export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const data = await fetchUserInfo("api/post/getAll");
      if (data) {
        setPosts(data);
      } else {
        setError("Failed to fetch posts");
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

// ******** Post container: a function that displays a form to create a new post **********// 
export function PostContainer() {
    const [imageFile, setImageFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      title: "",
      content: "",
      privacy: "public",
    });
    const [imagePreview, setImagePreview] = useState(null);
    const modalRef = useRef(null);
    const fileInputRef = useRef(null);
  
    // Add these state variables at the top of your PostContainer component
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const friendsModalRef = useRef(null);
  
    // Add this mock data (replace with your actual friends data)
    const friends = [
      { id: 1, name: "simo fadil", avatar: "/default-avatar.png" },
      { id: 2, name: "belmaayo the king", avatar: "/default-avatar.png" },
      { id: 3, name: "oriaxnxx", avatar: "/default-avatar.png" },
    ];
  
    // Add this function to handle friend selection
    const handleFriendSelection = (friendId) => {
      setSelectedFriends((prev) => {
        if (prev.includes(friendId)) {
          return prev.filter((id) => id !== friendId);
        }
        return [...prev, friendId];
      });
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setIsModalOpen(false);
        }
      };
  
      if (isModalOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isModalOpen]);
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        setImageFile(file);
      }
    };
  
    const removeImage = () => {
      setImagePreview(null);
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  
    // Handle post submission logic here
    const handleSubmit = async (e) => {
      e.preventDefault();
    //   console.log("Post data:", { ...formData, image: imagePreview });
      try {
        const newPostForm = new FormData();
  
        newPostForm.append("title", formData.title);
        newPostForm.append("content", formData.content);
        newPostForm.append("privacy", formData.privacy);
        if (imageFile) newPostForm.append("image", imageFile);
  
        const response = await fetch("http://localhost:8080/api/post/add", {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: newPostForm,
          credentials: "include",
        });
        
        if (response.status === 201) {
          console.log("Post created successfully");
          setIsModalOpen(false);
          setFormData({
            title: "",
            content: "",
            privacy: "public",
          });
          setImagePreview(null);
          // router.push("/content");
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };
  
    return (
      <div className="content-container">
        <div className="create-post-trigger" onClick={() => setIsModalOpen(true)}>
          <div className="trigger-input">What's on your mind?</div>
        </div>
  
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="create-post-modal" ref={modalRef}>
              <div className="modal-header">
                <h2>Create Post</h2>
                <button
                  className="close-button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
  
              <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                  <div className="image-upload-container">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file-input"
                      ref={fileInputRef}
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="upload-label">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                        <path d="M16 5V3" />
                        <path d="M8 14a3 3 0 0 1 3-3h4" />
                        <line x1="17" y1="8" x2="17" y2="14" />
                        <line x1="14" y1="11" x2="20" y2="11" />
                      </svg>
                      Upload Image
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="image-preview-container">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview"
                      />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={removeImage}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
  
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Post title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    className="form-input"
                    required
                  />
                </div>
  
                <div className="form-group">
                  <textarea
                    placeholder="Write your post..."
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: e.target.value,
                      })
                    }
                    className="form-textarea"
                    required
                  />
                </div>
  
                <div className="privacy-options">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      checked={formData.privacy === "public"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacy: e.target.value,
                        })
                      }
                    />
                    <span className="radio-custom"></span>
                    Public
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="privacy"
                      value="private"
                      checked={formData.privacy === "private"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacy: e.target.value,
                        })
                      }
                    />
                    <span className="radio-custom"></span>
                    Private
                  </label>
                </div>
                <div className="target-friends-section">
                  <button
                    type="button"
                    className="target-friends-button"
                    onClick={() => setShowFriendsModal(true)}
                  >
                    Target Friends
                  </button>
                </div>
                {showFriendsModal && (
                  <div className="friends-modal-overlay">
                    <div className="friends-modal" ref={friendsModalRef}>
                      <div className="friends-modal-header">
                        <h3>Select Friends</h3>
                        <button
                          className="close-button"
                          onClick={() => setShowFriendsModal(false)}
                          aria-label="Close modal"
                        >
                          ×
                        </button>
                      </div>
  
                      <div className="friends-list">
                        {friends.map((friend) => (
                          <label key={friend.id} className="friend-item">
                            <input
                              type="checkbox"
                              checked={selectedFriends.includes(friend.id)}
                              onChange={() => handleFriendSelection(friend.id)}
                            />
                            <div className="friend-avatar">
                              <img src={friend.avatar} alt={friend.name} />
                            </div>
                            <span className="friend-name">{friend.name}</span>
                          </label>
                        ))}
                      </div>
  
                      <div className="friends-modal-footer">
                        <button
                          className="confirm-selection"
                          onClick={() => {
                            console.log("Selected friends:", selectedFriends);
                            setShowFriendsModal(false);
                          }}
                        >
                          Confirm Selection
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <button type="submit" className="submit-button">
                  Create Post
                  <div className="button-glow"></div>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }