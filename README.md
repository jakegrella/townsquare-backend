# Comake Node Database

There are two versions of the backend for this project. This repo contains only the version created with Node.js.

## Endpoints

---

### Auth

url: `/auth`

| Method | url       | parameters | payload                                                    | returns                                               |
| :----: | --------- | ---------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| `POST` | /register | -          | { (string) username, (string) password, (string) zipCode } | adds user, returns new user                           |
| `POST` | /login    | -          | { (string) username, (string) password }                   | logs in user, returns success message including token |

---

### Posts (Issues)

url: `/api/posts`

|  Method  | url                | parameters        | payload                                     | returns                               |
| :------: | ------------------ | ----------------- | ------------------------------------------- | ------------------------------------- |
|  `GET`   | /                  | -                 | -                                           | all posts                             |
|  `GET`   | /z/:zipCode        | (string) zip code | -                                           | all posts for single location         |
|  `GET`   | /u/:username       | (string) username | -                                           | all posts by single user              |
|  `GET`   | /p/:postId/likes   | (int) post_id     | -                                           | all likes on a single post            |
|  `GET`   | /u/:username/likes | (string) username | -                                           | all posts liked by single user        |
|  `POST`  | /p/create          | -                 | { (string) description, (string) imageUrl } | creates new post, returns post        |
|  `PUT`   | /p/:postId         | (int) post_id     | whichever from above needs updated          | updates post, returns post            |
| `DELETE` | /p/:postId         | (int) post_id     | -                                           | deletes post, returns success message |

---

### Likes

url: `/api/likes`

|  Method  | url     | parameters | payload           | returns                |
| :------: | ------- | ---------- | ----------------- | ---------------------- |
|  `POST`  | /like   | -          | { (int) post_id } | liked post             |
| `DELETE` | /unlike | -          | { (int) post_id } | unlike success message |

---

### Users

url: `/api/users`

|  Method  | url        | parameters     | payload | returns                               |
| :------: | ---------- | -------------- | ------- | ------------------------------------- |
| `DELETE` | /:username | (int) username | -       | deletes user, returns success message |

---
