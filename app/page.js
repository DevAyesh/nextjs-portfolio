"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaPython, FaPhp, FaLaravel, FaVuejs, FaJava, FaDatabase, FaGitAlt, FaDocker, FaCode, FaMicrochip, FaServer, FaTools, FaAws, FaFigma, FaLinux, FaGithub, FaRobot, FaGlobe, FaCloud } from "react-icons/fa";
import { IoLogoIonic, IoLogoJavascript } from "react-icons/io";
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiExpress, SiFlask, SiDjango, SiMongodb, SiPostman, SiFramer, SiMui, SiPostgresql, SiTensorflow, SiPandas, SiNumpy, SiScikitlearn, SiOpencv, SiSpringboot, SiFirebase, SiFastapi, SiMysql, SiPytorch, SiJupyter } from "react-icons/si";
import { FaAndroid } from "react-icons/fa";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const roles = useMemo(
    () => ["Software Engineer", "Full Stack Developer", "AI Enthusiast", "DevOps Learner"],
    []
  );
  const [typedText, setTypedText] = useState("");
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Initialize Particles.js
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        "particles": {
          "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": "#ffffff" },
          "opacity": { "value": 0.5, "random": false },
          "size": { "value": 3, "random": true },
          "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
          "move": { "enable": true, "speed": 6 }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } },
          "modes": { "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
      });
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);

      const sections = document.querySelectorAll("section[id]");
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          setActiveSection(section.getAttribute("id"));
        }
      });
    };

    // Handle mobile menu open/close for transparent navbar
    const navbar = document.querySelector(".custom-navbar");
    const navbarCollapse = document.querySelector("#navbarNav");
    
    const handleMenuToggle = () => {
      if (navbarCollapse && navbar) {
        if (navbarCollapse.classList.contains("show")) {
          navbar.classList.add("menu-open");
        } else {
          navbar.classList.remove("menu-open");
        }
      }
    };

    // Listen for Bootstrap collapse events
    if (navbarCollapse) {
      navbarCollapse.addEventListener("shown.bs.collapse", handleMenuToggle);
      navbarCollapse.addEventListener("hidden.bs.collapse", handleMenuToggle);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navbarCollapse) {
        navbarCollapse.removeEventListener("shown.bs.collapse", handleMenuToggle);
        navbarCollapse.removeEventListener("hidden.bs.collapse", handleMenuToggle);
      }
    };
  }, []);

  useEffect(() => {
    const fullText = roles[displayIndex];
    const typeSpeed = 80;
    const deleteSpeed = 45;
    const pauseAfterComplete = 900;
    const pauseBeforeStart = 400;

    if (!isDeleting && typedText === "") {
      const timer = setTimeout(() => {
        setTypedText(fullText.substring(0, 1));
      }, pauseBeforeStart);
      return () => clearTimeout(timer);
    }

    const handleTyping = () => {
      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseAfterComplete);
        return;
      }

      if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setDisplayIndex((prev) => (prev + 1) % roles.length);
        return;
      }

      const nextText = isDeleting
        ? fullText.substring(0, typedText.length - 1)
        : fullText.substring(0, typedText.length + 1);

      setTypedText(nextText);
    };

    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, displayIndex, roles]);

  const techStack = [
    {
      title: "Frontend Technologies",
      icon: FaCode,
      items: [
        { label: "React", icon: FaReact },
        { label: "Next.js", icon: SiNextdotjs },
        { label: "JavaScript", icon: IoLogoJavascript },
        { label: "HTML", icon: FaHtml5 },
        { label: "CSS", icon: FaCss3Alt },
      ]
    },
    {
      title: "Backend Technologies",
      icon: FaServer,
      items: [
        { label: "Node.js", icon: FaNodeJs },
        { label: "Express", icon: SiExpress },
        { label: "Django", icon: SiDjango },
        { label: "FastAPI", icon: SiFastapi },
      ]
    },
    {
      title: "Database",
      icon: FaDatabase,
      items: [
        { label: "MongoDB", icon: SiMongodb },
        { label: "MySQL", icon: SiMysql },
      ]
    },
    {
      title: "Machine Learning",
      icon: FaRobot,
      items: [
        { label: "TensorFlow", icon: SiTensorflow },
        { label: "PyTorch", icon: SiPytorch },
        { label: "NumPy", icon: SiNumpy },
        { label: "Pandas", icon: SiPandas },
        { label: "Scikit-learn", icon: SiScikitlearn },
      ]
    },
    {
      title: "Tools & DevOps",
      icon: FaTools,
      items: [
        { label: "GitHub", icon: FaGithub },
        { label: "GitHub Actions", icon: FaGithub },
        { label: "VS Code", icon: FaCode },
        { label: "Docker", icon: FaDocker },
        { label: "Postman", icon: SiPostman },
        { label: "Android Studio", icon: FaAndroid },
        { label: "Jupyter Notebook", icon: SiJupyter },
        { label: "Google Cloud Console", icon: FaCloud },
      ]
    }
  ];

  const bgIcons = [
    { icon: FaReact, style: { top: '8%', left: '12%', animationDelay: '0s' } },
    { icon: SiNextdotjs, style: { top: '18%', left: '78%', animationDelay: '1.5s' } },
    { icon: IoLogoJavascript, style: { top: '42%', left: '20%', animationDelay: '3s' } },
    { icon: FaHtml5, style: { top: '30%', left: '55%', animationDelay: '4.5s' } },
    { icon: FaCss3Alt, style: { top: '60%', left: '10%', animationDelay: '2.5s' } },
    { icon: FaNodeJs, style: { top: '65%', left: '72%', animationDelay: '5s' } },
    { icon: SiExpress, style: { top: '78%', left: '38%', animationDelay: '6.5s' } },
    { icon: SiMongodb, style: { top: '22%', left: '33%', animationDelay: '2s' } },
    { icon: FaDatabase, style: { top: '52%', left: '82%', animationDelay: '4s' } },
    { icon: FaPython, style: { top: '70%', left: '52%', animationDelay: '1s' } },
    { icon: SiTensorflow, style: { top: '12%', left: '46%', animationDelay: '3.5s' } },
    { icon: SiPytorch, style: { top: '48%', left: '63%', animationDelay: '0.5s' } },
    { icon: SiTypescript, style: { top: '14%', left: '6%', animationDelay: '2.8s' } },
    { icon: FaGithub, style: { top: '32%', left: '90%', animationDelay: '1.2s' } },
    { icon: FaDocker, style: { top: '58%', left: '88%', animationDelay: '4.2s' } },
    { icon: SiTailwindcss, style: { top: '74%', left: '5%', animationDelay: '5.8s' } },
    { icon: SiDjango, style: { top: '82%', left: '58%', animationDelay: '6.9s' } },
    { icon: SiMysql, style: { top: '38%', left: '8%', animationDelay: '3.9s' } },
    { icon: SiPostman, style: { top: '6%', left: '62%', animationDelay: '2.1s' } },
    { icon: SiJupyter, style: { top: '46%', left: '48%', animationDelay: '5.1s' } },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
      const targetPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      setActiveSection(id.replace('#', ''));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    e.target.reset();
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top custom-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand text-white" href="#home" onClick={(e) => scrollToSection(e, '#home')}>Ayesh Madhuranga</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <li className="nav-item" key={item}>
                  <a
                    className={`nav-link ${activeSection === item ? 'active' : ''}`}
                    href={`#${item}`}
                    onClick={(e) => scrollToSection(e, `#${item}`)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section min-vh-100 d-flex align-items-center">
        <div id="particles-js"></div>

        {/* Social Sidebar (Desktop) */}
        <div className="social-links position-absolute start-0 top-50 translate-middle-y d-none d-lg-flex flex-column gap-4 ms-5">
          <a href="#" className="social-icon fs-4"><i className="fab fa-github"></i></a>
          <a href="#" className="social-icon fs-4"><i className="fab fa-instagram"></i></a>
          <a href="#" className="social-icon fs-4"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="social-icon fs-4"><i className="fab fa-facebook"></i></a>
          <a href="#" className="social-icon fs-4"><i className="fab fa-youtube"></i></a>
        </div>

        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="hero-content text-center text-lg-start">
                <h3 className="text-warning mb-3 h4">Hi There, I&apos;m</h3>
                <h1 className="display-3 fw-bold text-white mb-3">Ayesh Madhuranga</h1>
                <h2 className="h3 text-light mb-4 text-opacity-75 hero-role">
                  &lt;/<span className="role-rotator">{typedText}</span><span className="role-caret" aria-hidden="true"></span>&gt;
                </h2>
                <p className="lead text-light mb-4 text-opacity-75">
                  As a software engineer driven by a passion for innovation, I specialize in designing and delivering unique, cutting-edge solutions.
                </p>

                <div className="d-flex justify-content-center justify-content-lg-start gap-3 hero-actions">
                  <a href="#contact" className="btn btn-warning" onClick={(e) => scrollToSection(e, '#contact')}>
                    <i className="fas fa-envelope me-2"></i>Get In Touch
                  </a>
                  <a href="/resume.pdf" target="_blank" className="btn btn-outline-warning">
                    <i className="fas fa-download me-2"></i>Download CV
                  </a>
                </div>

                {/* Mobile Social */}
                <div className="d-flex gap-4 mt-4 justify-content-center d-lg-none">
                  <a href="#" className="social-icon fs-4"><i className="fab fa-github"></i></a>
                  <a href="#" className="social-icon fs-4"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="social-icon fs-4"><i className="fab fa-linkedin"></i></a>
                  <a href="#" className="social-icon fs-4"><i className="fab fa-facebook"></i></a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 order-1 order-lg-2">
              <div className="hero-image">
                <img
                  src="/images/profile3.png"
                  alt="Ayesh Madhuranga"
                  className="img-fluid hero-img"
                  style={{ maxWidth: '400px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-secondary-section">
        <div className="container">
          <h2 className="display-5 fw-bold text-white mb-5 text-center">About Me</h2>

          <div className="row g-4 align-items-center">
            {/* Left Column - Profile Image */}
            <div className="col-lg-4">
              <div className="about-profile-card">
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className="about-profile-img"
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="col-lg-8">
              {/* About Me Description */}
              <div className="about-content-card mb-4">
                <p className="about-description">
                  I am an IT student and full stack developer who enjoys building practical applications for the web, mobile, and cloud. I focus on clear architecture, reliable systems, and simple user experiences. I like bringing ideas to life through real projects and steady learning.
                </p>
              </div>

              {/* Academic Background */}
              <div className="about-section-block mb-4">
                <h3 className="about-section-title">
                  <i className="fas fa-graduation-cap me-2"></i>
                  Academic Background
                </h3>
                <div className="education-timeline">
                  {/* Education Entry 1 */}
                  <div className="education-item">
                    <div className="education-dot"></div>
                    <div className="education-content">
                      <div className="education-period">2024 - Present</div>
                      <h4 className="education-title">BSc (Hons) in Information Technology</h4>
                      <div className="education-institution">HORIZON Campus</div>
                      <p className="education-description">
                        Reading for my honors degree, specializing in Information Technology with a focus on Full Stack Development.
                      </p>
                    </div>
                  </div>

                  {/* Education Entry 2 */}
                  <div className="education-item">
                    <div className="education-dot"></div>
                    <div className="education-content">
                      <div className="education-period">2018 - 2020</div>
                      <h4 className="education-title">G.C.E. Advanced Level (Technology Stream)</h4>
                      <div className="education-institution">Rajasinghe Central College , Hanwella</div>

                    </div>
                  </div>

                  {/* Education Entry 3 */}
                  <div className="education-item">
                    <div className="education-dot"></div>
                    <div className="education-content">
                      <div className="education-period">2012 - 2017</div>
                      <h4 className="education-title">G.C.E. Ordinary Level</h4>
                      <div className="education-institution">Rajasinghe Central College , Hanwella</div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Work Process */}
              <div className="about-section-block">
                <h3 className="about-section-title">Work Process</h3>
                <div className="work-process-grid">
                  <div className="work-process-item">
                    <div className="work-process-number">#01</div>
                    <div className="work-process-label">Research</div>
                  </div>
                  <div className="work-process-item">
                    <div className="work-process-number">#02</div>
                    <div className="work-process-label">Design</div>
                  </div>
                  <div className="work-process-item">
                    <div className="work-process-number">#03</div>
                    <div className="work-process-label">Build</div>
                  </div>
                  <div className="work-process-item">
                    <div className="work-process-number">#04</div>
                    <div className="work-process-label">Deploy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-dark-section">
        <div className="container position-relative">
          {/* Horizontal Traveling Icons */}
          <div className="traveling-icons">
            <FaReact className="travel-icon" style={{ animationDelay: '0s' }} />
            <SiNextdotjs className="travel-icon" style={{ animationDelay: '2s' }} />
            <IoLogoJavascript className="travel-icon" style={{ animationDelay: '4s' }} />
            <FaHtml5 className="travel-icon" style={{ animationDelay: '6s' }} />
            <FaCss3Alt className="travel-icon" style={{ animationDelay: '8s' }} />
            <FaNodeJs className="travel-icon" style={{ animationDelay: '1s' }} />
            <SiExpress className="travel-icon" style={{ animationDelay: '3s' }} />
            <SiMongodb className="travel-icon" style={{ animationDelay: '5s' }} />
            <FaDatabase className="travel-icon" style={{ animationDelay: '7s' }} />
            <FaJava className="travel-icon" style={{ animationDelay: '9s' }} />
            <FaPython className="travel-icon" style={{ animationDelay: '1.5s' }} />
            <FaDocker className="travel-icon" style={{ animationDelay: '3.5s' }} />
            <FaGithub className="travel-icon" style={{ animationDelay: '5.5s' }} />
            <FaAws className="travel-icon" style={{ animationDelay: '7.5s' }} />
          </div>

          <h2 className="display-5 fw-bold text-white mb-5 text-center" style={{ position: 'relative', zIndex: 2 }}>Tech Stack</h2>

          <div className="stack-bg-icons">
            {bgIcons.map(({ icon: Icon, style }, idx) => (
              <Icon key={idx} className="stack-bg-icon" style={style} />
            ))}
          </div>

          <div className="tech-stack-list">
            {techStack.map((category) => (
              <div className="stack-row" key={category.title}>
                <div className="stack-row-header">
                  <category.icon className="stack-row-icon" />
                  <h3 className="stack-row-title">{category.title}</h3>
                </div>
                <div className="stack-pill-grid">
                  {category.items.map((item) => (
                    <div className="stack-pill" key={item.label}>
                      <item.icon className="stack-pill-icon" />
                      <span className="stack-pill-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-secondary-section">
        <div className="container">
          <h2 className="display-5 fw-bold text-white mb-5 text-center">My Projects</h2>
          <div className="row g-4">
            {[
              { img: "/images/project1.png", title: "AI Dockerfile Optimizer", desc: "AI-powered research document generator that creates comprehensive research papers using advanced AI models. Features intelligent citation management and automated formatting.", icons: ['FaPython', 'FaDocker', 'FaRobot'] },
              { img: "/images/project2.png", title: "FinanceMe DevOps", desc: "Modern grocery store web application with a clean and responsive UI. Built with efficient state management using Redux, featuring real-time inventory updates.", icons: ['FaAws', 'FaDocker', 'FaServer'] },
              { img: "/images/project3.png", title: "Personal Portfolio", desc: "Modern responsive portfolio website showcasing projects and skills with smooth animations and interactive UI elements.", icons: ['FaReact', 'FaBootstrap', 'FaCode'] },
              { img: "/images/project4.png", title: "Smart Parking", desc: "IoT-based parking management system with real-time monitoring and automated slot allocation for efficient parking solutions.", icons: ['FaPython', 'FaMicrochip', 'FaServer'] },
              { img: "/images/project5.png", title: "Job Tracker", desc: "Application management system to track interviews, manage job applications, and organize the entire job search process efficiently.", icons: ['FaReact', 'FaNodeJs', 'FaDatabase'] },
              { img: "/images/project6.png", title: "Pro Website", desc: "Professional services website with modern design, optimized performance, and seamless user experience across all devices.", icons: ['FaHtml5', 'FaCss3Alt', 'FaCode'] }
            ].map((project, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div className="project-card">
                  <div className="project-image-wrapper">
                    <img src={project.img} alt={project.title} className="project-preview-img" />
                  </div>
                  <div className="project-content">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-tech-icons">
                        {project.icons.map((icon, i) => {
                          const IconMap = { FaPython, FaDocker, FaRobot, FaAws, FaServer, FaReact, FaBootstrap, FaCode, FaMicrochip, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt };
                          const Icon = IconMap[icon];
                          return Icon ? <Icon key={i} /> : null;
                        })}
                      </div>
                    </div>
                    <p className="project-description">{project.desc}</p>
                    <div className="project-links">
                      <a href="#" className="project-link">
                        <i className="fas fa-external-link-alt"></i> Live Demo
                      </a>
                      <a href="#" className="project-link">
                        <i className="fab fa-github"></i> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="contact-main-title">Let&apos;s Connect</h2>

          <div className="row g-3">
            {/* Left Card - Send Message Form */}
            <div className="col-lg-6">
              <div className="contact-form-card">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <input type="text" className="contact-new-input" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6">
                      <input type="email" className="contact-new-input" placeholder="Your Email" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <select className="contact-new-input contact-select" required>
                      <option value="">General Inquiries</option>
                      <option value="project">Project Inquiry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <textarea className="contact-new-input contact-textarea" rows="5" placeholder="Your Message" required></textarea>
                  </div>
                  <button type="submit" className="contact-new-submit-btn">
                    <i className="fas fa-paper-plane me-2"></i> Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Right Card - Connect With Me */}
            <div className="col-lg-6">
              <div className="contact-glass-card d-flex flex-column h-100">
                <h3 className="contact-card-title mb-2">Connect with me</h3>
                <p className="contact-card-subtitle mb-4">You can also reach out to me directly through these channels.</p>

                <div className="flex-grow-1">
                  {[
                    { icon: "fa-github", iconBrand: "fab", title: "GitHub", val: "github.com/ayeshmadhuranga" },
                    { icon: "fa-linkedin", iconBrand: "fab", title: "LinkedIn", val: "linkedin.com/in/ayeshmadhuranga" },
                    { icon: "fa-envelope", iconBrand: "fas", title: "Email", val: "ayesh@example.com" },
                    { icon: "fa-phone", iconBrand: "fas", title: "Phone", val: "+94 77 123 4567" }
                  ].map((item, idx) => (
                    <div key={idx} className="contact-info-item">
                      <div className="contact-info-icon">
                        <i className={`${item.iconBrand} ${item.icon}`}></i>
                      </div>
                      <div>
                        <h5 className="contact-info-title">{item.title}</h5>
                        <p className="contact-info-value">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="contact-location">
                  <span className="location-label">Current Location:</span>
                  <span className="location-value">Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-4 bg-secondary-section text-center border-top border-secondary">
        <div className="container">
          <p className="mb-0 text-light text-opacity-50 small">© 2025 Ayesh Madhuranga. All Rights Reserved.</p>
        </div>
      </footer>

      <button className={`back-to-top ${showBackToTop ? 'show' : ''}`} onClick={scrollToTop} aria-label="Back to top">
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}
