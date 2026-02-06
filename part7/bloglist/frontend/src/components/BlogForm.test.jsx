import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls addBlog", async () => {
  const user = userEvent.setup();
  const addBlog = vi.fn();

  render(<BlogForm addBlog={addBlog} />);

  const titleInput = screen.getByPlaceholderText("Title");
  const authorInput = screen.getByPlaceholderText("Author");
  const urlInput = screen.getByPlaceholderText("Url");
  const createButton = screen.getByText("create");

  await user.type(titleInput, "Test Blog");
  await user.type(authorInput, "John Doe");
  await user.type(urlInput, "http://testblog.com/johndoe");
  await user.click(createButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("Test Blog");
  expect(addBlog.mock.calls[0][0].author).toBe("John Doe");
  expect(addBlog.mock.calls[0][0].url).toBe("http://testblog.com/johndoe");
});
