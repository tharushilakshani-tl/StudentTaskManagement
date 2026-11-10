CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    available TINYINT(1) DEFAULT 1
);

INSERT INTO books (title, author, category, available) 
VALUES 
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 1),
    ('To Kill a Mockingbird', 'Harper Lee', 'Classic Fiction', 1),
    ('1984', 'George Orwell', 'Dystopian', 1),
    ('Clean Code', 'Robert C. Martin', 'Software Engineering', 1),
    ('Design Patterns', 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides', 'Software Engineering', 0),
    ('The Pragmatic Programmer', 'Andrew Hunt, David Thomas', 'Software Engineering', 1);