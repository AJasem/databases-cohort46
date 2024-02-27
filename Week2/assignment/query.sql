use university;
SELECT authors.*,
    research_papers.paper_title
FROM authors
    JOIN author_researchPapers ON authors.author_id = author_researchPapers.author_id
    JOIN research_papers ON author_researchPapers.paper_id = research_papers.paper_id;
-- all reserach paper and the number of authors wrote them
SELECT rp.paper_id,
    rp.paper_title,
    COUNT(ar.author_id) AS num_authors
FROM research_papers rp
    JOIN author_researchPapers ar ON rp.paper_id = ar.paper_id
GROUP BY rp.paper_id,
    rp.paper_title;
-- sum of paper by female
SELECT a.gender,
    COUNT(DISTINCT ar.paper_id) AS num_papers_published
FROM authors a
    JOIN author_researchPapers ar ON a.author_id = ar.author_id
WHERE a.gender = 'Female'
GROUP BY a.gender;
-- average of h-index per uni
SELECT university,
    AVG(h_index) AS avg_h_index
FROM authors
GROUP BY university;
-- some of research paper by uni
SELECT a.university,
    COUNT(rp.paper_id) AS total_papers
FROM authors a
    LEFT JOIN author_researchPapers arp ON a.author_id = arp.author_id
    LEFT JOIN research_papers rp ON arp.paper_id = rp.paper_id
GROUP BY a.university;
-- min max h-index by uni
SELECT university,
    MIN(h_index) AS min_h_index,
    MAX(h_index) AS max_h_index
FROM authors
GROUP BY university;