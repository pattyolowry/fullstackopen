-- Create blogs table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

-- Add two blogs
insert into blogs (author, url, title) values ('Fedor Borisyuk', 'https://www.linkedin.com/blog/engineering/search/reimagining-linkedins-search-stack', 'Reimagining LinkedIn’s search tech stack');
insert into blogs (author, url, title) values ('Abhijeet Dave', 'https://www.freecodecamp.org/news/how-to-create-and-use-checkboxes-in-figma/', 'How to Create and Use Checkboxes in Figma');