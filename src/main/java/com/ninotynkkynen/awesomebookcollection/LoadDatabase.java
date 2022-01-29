package com.ninotynkkynen.awesomebookcollection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(BookRepository repository) {
        return args -> {
            repository.save(new Book(
                    "Norjalaisia villapaitoja",
                    "Linka Neumann",
                    "Lämpöiset ja pörröiset kirjoneulepaidat tuuleen ja tuiskuun. Neulo aito, moderni norjalaispaita! Norjalaisesta luonnosta inspiraationsa saaneet 13 kirjoneulemallia aidosta villasta. Eläinaiheita, revontulia ja folk-henkeä parhaimmillaan, ohutta tai paksua lankaa tarpeen mukaan."));
            repository.save(new Book(
                    "The Beautiful Poetry of Donald Trump",
                    "Rob Sears",
                    "What if there's a hidden dimension to Donald Trump; a sensitive, poetic side? Driven by this question, Rob Sears began combing Trump's words for signs of poetry. What he found was a revelation. By simply taking the 45th President of the United States' tweets and transcripts, cutting them up and reordering them, Sears unearthed a trove of beautiful verse that was just waiting to be discovered. This groundbreaking collection gives readers a glimpse of Trump's innermost thoughts and feelings on everything from the nature of truth, to what he hates about Lord Sugar. And it will reveal a hitherto hidden Donald, who may surprise and delight both students and critics alike. Now with seventeen all-new poems! As we lurch deeper into the Trump presidency, this timely publication also includes Sears' scholarly footnotes and introduction, in which he excavates new critical angles and insights into the President's poetry which the casual reader might initially overlook."));

            repository.findAll().forEach(book -> log.info("Preloaded " + book));
        };
    }
}