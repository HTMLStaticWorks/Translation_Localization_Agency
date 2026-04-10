/* 
  Lingua - Dashboard JavaScript
  Author: Antigravity AI
*/

document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (sidebarToggle && sidebar) {
        const sidebarClose = document.getElementById('sidebar-close');

        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('hidden');
        });

        if (sidebarClose) {
            sidebarClose.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.add('hidden');
            });
        }

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.add('hidden');
        });
    }

    // Handle Project Sorting/Filtering (Mock UI)
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('bg-secondary', 'text-white'));
            btn.classList.add('bg-secondary', 'text-white');
        });
    });
});

// Section Switching Logic
function showSection(sectionId) {
    // 1. Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.classList.add('hidden'));

    // 2. Show target section
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // 3. Update Sidebar Active State
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('bg-secondary/10', 'text-secondary', 'font-bold');
        link.classList.add('text-gray-400');
    });

    const activeLink = document.getElementById(`nav-${sectionId}`);
    if (activeLink) {
        activeLink.classList.add('bg-secondary/10', 'text-secondary', 'font-bold');
        activeLink.classList.remove('text-gray-400');
    }

    // 4. Update Header Title
    const headerTitle = document.getElementById('header-title');
    if (headerTitle) {
        headerTitle.innerText = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    }

    // 5. Close Mobile Sidebar if open
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.add('hidden');
    }
}
