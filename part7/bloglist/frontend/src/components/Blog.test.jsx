import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

vi.mock("../services/blogs");

test("renders content", () => {
  const blog = {
    title: "This is a Test Blog",
    author: "John Doe",
    url: "https://testblog.com/johndoe",
    likes: 42,
    user: {
      username: "pedrop",
      name: "Pedro Pascal",
    },
  };

  const addLike = vi.fn();
  const removeBlog = vi.fn();

  render(<Blog blog={blog} addLike={addLike} removeBlog={removeBlog} />);

  const titleByAuthor = screen.getByText("This is a Test Blog by John Doe");
  expect(titleByAuthor).toBeVisible();

  const url = screen.getByText("https://testblog.com/johndoe", {
    exact: false,
  });
  expect(url).not.toBeVisible();

  const likes = screen.getByText("Likes 42", { exact: false });
  expect(likes).not.toBeVisible();
});

test("clicking the view button shows url and likes", async () => {
  const blog = {
    title: "This is a Test Blog",
    author: "John Doe",
    url: "https://testblog.com/johndoe",
    likes: 42,
    user: {
      username: "pedrop",
      name: "Pedro Pascal",
    },
  };

  const addLike = vi.fn();
  const removeBlog = vi.fn();

  render(<Blog blog={blog} addLike={addLike} removeBlog={removeBlog} />);

  let url = screen.getByText("https://testblog.com/johndoe", { exact: false });
  expect(url).not.toBeVisible();

  let likes = screen.getByText("Likes 42", { exact: false });
  expect(likes).not.toBeVisible();

  const user = userEvent.setup();
  const button = screen.getByText("View");
  await user.click(button);

  url = screen.getByText("https://testblog.com/johndoe", { exact: false });
  expect(url).toBeVisible();

  likes = screen.getByText("Likes 42", { exact: false });
  expect(likes).toBeVisible();
});

test("clicking the Like button twice calles the handler twice", async () => {
  const blog = {
    title: "This is a Test Blog",
    author: "John Doe",
    url: "https://testblog.com/johndoe",
    likes: 42,
    user: {
      username: "pedrop",
      name: "Pedro Pascal",
    },
  };

  const addLike = vi.fn();
  const removeBlog = vi.fn();

  render(<Blog blog={blog} addLike={addLike} removeBlog={removeBlog} />);

  const user = userEvent.setup();
  const likeButton = screen.getByText("Like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(addLike.mock.calls).toHaveLength(2);
});
