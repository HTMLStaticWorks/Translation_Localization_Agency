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

    // Mock Notification Center
    const notificationCenter = document.getElementById('notifications-btn');
    if (notificationCenter) {
        notificationCenter.addEventListener('click', () => {
            alert("No new notifications at the moment.");
        });
    }
});
