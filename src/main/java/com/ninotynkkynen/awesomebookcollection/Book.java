package com.ninotynkkynen.awesomebookcollection;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
class Book {
    private @Id @GeneratedValue Long id;

    @NotNull
    @Size(min=1)
    private String title;

    @NotNull
    @Size(min=1)
    private String author;

    @Lob 
    @Column(name="CONTENT", length=2000)
    private String description;

    Book() {
    }

    Book(String title, String author, String description) {
        this.title = title;
        this.author = author;
        this.description = description;
    }

    public Long getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public String getAuthor() {
        return this.author;
    }

    public String getDescription() {
        return this.description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Book))
            return false;
        Book book = (Book) o;
        return Objects.equals(this.id, book.id) &&
                Objects.equals(this.title, book.title) &&
                Objects.equals(this.author, book.author) &&
                Objects.equals(this.description, book.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.title, this.author, this.description);
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + this.id +
                ", title='" + this.title + '\'' +
                ", author='" + this.author + '\'' +
                ", description='" + this.description + '\'' + '}';
    }
}
