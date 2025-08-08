import React, { useState, useEffect, useRef } from 'react';
import styles from './Landing.module.css';

function Landing() {
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });
  const [isLoading, setIsLoading] = useState(false);
  const quoteRef = useRef(null);
  const buttonRef = useRef(null);

  const fetchRandomQuote = async () => {
    try {
      setIsLoading(true);
      const timestamp = new Date().getTime();
      const response = await fetch(
        `https://api.quotable.io/random?tags=technology,science,wisdom&t=${timestamp}`,
        {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        }
      );
      const data = await response.json();
      if (data.content === currentQuote.text) {
        return fetchRandomQuote();
      }
      setCurrentQuote({ text: data.content, author: data.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
      const fallbackQuotes = [
        {
          text: 'Innovation is the outcome of a habit, not a random act.',
          author: 'Sukant Ratnakar',
        },
        {
          text: 'Technology is best when it brings people together.',
          author: 'Matt Mullenweg',
        },
        {
          text: 'The only way to do great work is to love what you do.',
          author: 'Steve Jobs',
        },
        {
          text:
            'Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.',
          author: 'Patrick McKenzie',
        },
      ];
      const randomFallback =
        fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setCurrentQuote(randomFallback);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        currentQuote.text &&
        quoteRef.current &&
        buttonRef.current &&
        !quoteRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setCurrentQuote({ text: '', author: '' });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentQuote.text]);

  const showRandomQuote = () => {
    fetchRandomQuote();
    setIsButtonAnimating(true);
    setTimeout(() => setIsButtonAnimating(false), 500);
  };

  const sections = [
    {
      title: 'Featured Projects',
      items: [
        {
          category: 'Modern Portfolio',
          skills: ['React', 'CSS Modules', 'Responsive Design', 'Animation'],
          description:
            'A dynamic portfolio website built with React and CSS Modules, featuring interactive elements, smooth animations, and a random tech quote generator. Demonstrates modern web development practices and responsive design principles.',
          link: 'https://github.com/niteshpandey-dev/portfolio',
        },
        {
          category: 'Task Management System',
          skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
          description: 'A full-stack task management application with real-time updates, user authentication, and collaborative features. Includes drag-and-drop functionality, task prioritization, and team management capabilities.',
          link: 'https://github.com/niteshpandey-dev/task-manager',
        },
        {
          category: 'E-Commerce Platform',
          skills: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'TailwindCSS'],
          description: 'A modern e-commerce platform built with Next.js and TypeScript. Features include product catalog management, shopping cart functionality, secure payment integration with Stripe, and responsive design.',
          link: 'https://github.com/niteshpandey-dev/next-commerce',
        },
      ],
    },
    {
      title: 'What I Work With',
      items: [
        { category: 'Frontend', skills: ['React', 'HTML', 'CSS', 'JavaScript'] },
        { category: 'Backend', skills: ['Node.js', 'Express'] },
        { category: 'Tools', skills: ['Git', 'VS Code', 'Figma'] },
      ],
    },
    {
      title: 'Things I Love Building',
      items: [
        'Clean, responsive user interfaces',
        'Smooth, animated user experiences',
        'Backend logic that just works',
        'Projects that solve everyday problems',
      ],
    },
    {
      title: 'My Toolbox',
      items: [
        { category: 'Languages', skills: ['JavaScript', 'Python', 'Java', 'C', 'C++'] },
        { category: 'Frameworks', skills: ['React', 'Express'] },
        { category: 'Design', skills: ['Figma', 'Canva'] },
        { category: 'Deployment', skills: ['Vercel', 'Netlify'] },
      ],
    },
    {
      title: 'How I Work',
      items: [
        'I’m a quick and adaptive learner, always ready to explore new technologies and tools.',
        'I prioritize writing clean, scalable, and maintainable code.',
        'I value teamwork and continuous improvement through constructive feedback.',
        'I’m deeply focused on creating efficient, high-performance solutions with a strong user experience.',
      ],
    },
  ];

  return (
    <div className={styles.landing}>
      <button
        ref={buttonRef}
        className={`${styles.inspirationButton} ${isButtonAnimating ? styles.animate : ''} ${isLoading ? styles.loading : ''}`}
        onClick={showRandomQuote}
        disabled={isLoading}
      >
        {isLoading ? '⌛' : '💭'} Debug Your Mind
      </button>

      {currentQuote.text && (
        <div ref={quoteRef} className={styles.thoughtBubble}>
          <p className={styles.quoteText}>{currentQuote.text}</p>
          <p className={styles.quoteAuthor}>~ {currentQuote.author}</p>
        </div>
      )}

      <div className={styles.hero}>
        <h1 className={styles.name}>Nitesh Kumar Pandey</h1>
        <p className={styles.tagline}>Software Developer</p>
        <div className={styles.cta}>
          <a
            href="/resume.pdf"
            download
            className={styles.downloadButton}
            onClick={(e) => {
              // Prevent default if resume is not yet available
              if (!process.env.PUBLIC_URL + '/resume.pdf') {
                e.preventDefault();
                alert('Resume will be available soon!');
              }
            }}
          >
            <span className={styles.downloadIcon}>📄</span>
            View Resume
          </a>
        </div>
        <div className={styles.introSection}>
          <p className={styles.introParagraph}>
            I'm someone who enjoys building, learning, and solving real-world problems through technology. Whether it's designing clean user interfaces, developing full-stack applications, or exploring new tools and ideas, I love turning concepts into something meaningful and useful.
          </p>
          <p className={styles.introParagraph}>
            This space is a reflection of the work I've done, the skills I'm growing, and the journey I'm on. Feel free to take a look around — and if anything catches your interest, I'd love to connect.
          </p>
        </div>
      </div>

      {sections.map((section, index) => (
        <div key={index} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <div className={styles.sectionContent}>
            {Array.isArray(section.items[0]) ? (
              <div className={styles.listGrid}>
                {section.items.map((item, i) => (
                  <div key={i} className={styles.listItem}>{item}</div>
                ))}
              </div>
            ) : section.items[0].description ? (
              <div className={styles.projectsGrid}>
                {section.items.map((project, i) => (
                  <div key={i} className={styles.projectCard}>
                    <h3>{project.category}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    <div className={styles.projectSkills}>
                      {project.skills.map((skill, j) => (
                        <span key={j} className={styles.skillItem}>{skill}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                      View Project →
                    </a>
                  </div>
                ))}
              </div>
            ) : section.items[0].skills ? (
              <div className={styles.skillsGrid}>
                {section.items.map((category, i) => (
                  <div key={i} className={styles.skillBox}>
                    <h3>{category.category}</h3>
                    <div className={styles.skillItems}>
                      {category.skills.map((skill, j) => (
                        <span key={j} className={styles.skillItem}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.listGrid}>
                {section.items.map((item, i) => (
                  <div key={i} className={styles.listItem}>{item}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Landing;
