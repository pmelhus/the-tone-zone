import { useEffect } from "react";

const SearchUsers = ({ userResults }) => {
  return (
    <>
      {userResults?.map((user) => {
        return (

            <div className="search-user-card">
              <div className="user-image-container">
                <img
                  id={user.profileImageUrl ? "user-image" : "user-image-search"}
                  src={user.profileImageUrl}
                ></img>
              </div>
              <div className="search-user-username">
                <h2>{user.username}</h2>
                <p></p>
              </div>
            </div>

        );
      })}
    </>
  );
};

export default SearchUsers;
