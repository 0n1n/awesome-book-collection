package com.ninotynkkynen.awesomebookcollection;

import org.springframework.data.jpa.repository.JpaRepository;

interface BookRepository extends JpaRepository<Book, Long> {
    
}
