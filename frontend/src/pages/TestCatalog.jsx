import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { genomicTests } from '../mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';
import { EnquiryModal } from '../components/EnquiryModal';
import '../styles/genomics.css';

export const TestCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (test) => {
    addToCart(test);
    toast({
      title: "Added to Cart!",
      description: `${test.name} has been added to your cart.`,
    });
  };

  const handleEnquireClick = (testName) => {
    setSelectedTest(testName);
    setEnquiryModalOpen(true);
  };

  const categories = ['All', 'Clinical Genomics', 'Preventive Genomics'];
  const subCategories = ['All', 'Oncology', 'Neurology', 'Prenatal', 'Cardiology', 'Reproductive', 'Wellness', 'Nutrition'];

  const filteredTests = genomicTests.filter((test) => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || test.category === activeCategory;
    const matchesSubCategory = activeSubCategory === 'All' || test.subCategory === activeSubCategory;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-light)' }}>
      <EnquiryModal 
        isOpen={enquiryModalOpen} 
        onClose={() => setEnquiryModalOpen(false)}
        testName={selectedTest}
      />
      
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Comprehensive Testing</span>
            <h1 className="heading-1">Genomic Test Catalog</h1>
            <p className="body-large">
              Browse our complete range of clinical and preventive genomic tests. All tests include expert pre-test counseling and detailed report interpretation.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="search-filter-container">
            <div className="search-box">
              <div style={{ position: 'relative', flex: 1 }}>
                <Search
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                />
                <input
                  type="text"
                  placeholder="Search for tests (e.g., Whole Exome Sequencing, NIPT, Cancer)"
                  className="search-input"
                  style={{ paddingLeft: '3rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Category
              </label>
              <div className="filter-chips">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Specialty
              </label>
              <div className="filter-chips">
                {subCategories.map((subCategory) => (
                  <button
                    key={subCategory}
                    className={`filter-chip ${activeSubCategory === subCategory ? 'active' : ''}`}
                    onClick={() => setActiveSubCategory(subCategory)}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div style={{ marginBottom: '2rem' }}>
            <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              Showing {filteredTests.length} {filteredTests.length === 1 ? 'test' : 'tests'}
            </p>
          </div>

          {/* Test Grid */}
          <div className="test-grid">
            {filteredTests.map((test) => (
              <div key={test.id} className="test-card">
                <span className="test-category">{test.subCategory}</span>
                <h3 className="test-name">{test.name}</h3>
                <p className="test-description">{test.description}</p>
                <div className="test-meta">
                  <div>Sample: {test.sampleType}</div>
                  <div>Results: {test.turnaroundTime}</div>
                </div>
                <ul style={{ margin: '1rem 0', paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {test.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                  ))}
                </ul>
                <div className="test-price">{test.price}</div>
                <Link
                  to="/booking"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={scrollToTop}
                >
                  Book Test with Counseling
                </Link>
              </div>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                No tests found matching your search criteria. Try adjusting your filters or contact us for specific test inquiries.
              </p>
              <a
                href="https://wa.me/919742337892?text=I'm looking for a specific genetic test"
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '1rem' }}
              >
                Contact Us on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
