import React, { Fragment, useEffect, useState } from "react";
import "../../index.css";
import { createApi } from "unsplash-js";
import { updateWholeBoard } from "../../store/board.action";
import { useDispatch } from 'react-redux'

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "F8PEZf1QJYx2Y-w_HqRH_0DP36cIvfHudaeqjvU8mOU"
});

const PhotoComp = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <Fragment>
      <img className="img" src={urls.regular} />
      <a
        className="credit"
        href={`https://unsplash.com/@${user.username}`}
      >
      </a>
    </Fragment>
  );
};

export const SideMenu = ({ props }) => {
  const [data, setPhotosResponse] = useState(null);
  const [search, setSearch] = useState('colors')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!search) setSearch('cool')
    api.search
      .getPhotos({ query: search, orientation: "landscape" })
      .then(result => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [search]);

  const getPhotos = (ev) => {
    const { value } = ev.target
    setSearch(value)
  }

  const updateBackground = (url) => {
    const board = JSON.parse(JSON.stringify(props))
    board.style.imgUrl = url
    dispatch(updateWholeBoard(board))
  }

  if (data === null) {
    return <></>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <div className="feed">
        <div className="popover-header">
          <span>Cover photos</span>
        </div>
        <input onChange={(ev) => { getPhotos(ev) }} type="text" placeholder="Search" />
        <ul className="columnUl">
          {data.response.results.map(photo => (
            <li key={photo.id} className="li" onClick={() => updateBackground(photo.urls.full)}>
              <PhotoComp photo={photo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};