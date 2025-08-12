document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    const closeBtn = document.getElementById('closeSidebar');
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const headerHeight = document.querySelector('header')?.offsetHeight || 0; // Moved outside loop

    function openSidebar() {
        sidebar.classList.add('active');
        sidebar.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebar.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.contains('active') ? closeSidebar() : openSidebar();
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSidebar();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Keep if you need offset scrolling
            const id = link.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (!target) return;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
            window.scrollTo({ top, behavior: 'smooth' });
            closeSidebar();
        });
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggle.contains(e.target) && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});
