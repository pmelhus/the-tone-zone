import { useEffect } from "react";

const SearchUsers = ({ searchResults }) => {
  // if (!users.length) return null;
  // console.log(Object.values(searchResults.users)[0].profileImageUrl)
  return (
    <>
      {searchResults.users &&
        Object.values(searchResults.users).map((user) => {
          return (
            <ul>
              <li  className="search-user-card">
                <div className="user-image-container">
                  <img id={user.profileImageUrl ? "user-image" : "user-image-search"} src={user.profileImageUrl}></img>
                </div>
                <div>
                  <h4>{user.username}</h4>
                  <p></p>
                </div>
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default SearchUsers;
