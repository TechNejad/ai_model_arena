/*
  JavaScript for the AI Model Arena recreation.

  This script seeds the page with a small set of example models,
  generates the filter buttons, and implements simple search and
  filtering logic.  It does not include any backend or rating
  submission functionality—those features would require a server.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Colour mapping for company names.  These colours are chosen to
  // loosely correspond with the original AI Model Arena palette.
  const companyColors = {
    OpenAI: '#00FF41',
    Anthropic: '#8A2BE2',
    Google: '#00BFFF',
    Mistral: '#FF8C00',
    Perplexity: '#FF69B4',
    Meta: '#FFA500',
  };

  // Determine colour for a score (0–100).  High scores are green,
  // medium high are blue, medium are orange, and low are purple.
  function getScoreColor(score) {
    if (score >= 80) return '#00FF41';
    if (score >= 60) return '#00BFFF';
    if (score >= 40) return '#FF8C00';
    return '#8A2BE2';
  }
  // Hard‑coded model data; in a real app, this would come from an API.
  const models = [
    {
      id: 1,
      name: 'ChatGPT 4.1',
      company: 'OpenAI',
      version: '05‑15‑2025',
      description:
        'Adaptive iOS‑focused assistant with bio tool.',
      overall: 92,
      ratings: 1241,
      avatar: 'avatars/chatgpt.png',
      attributes: {
        RL: { name: 'Reasoning & Logic', score: 95 },
        CG: { name: 'Creativity & Generation', score: 88 },
        KI: { name: 'Knowledge & Information', score: 93 },
        AL: { name: 'Adaptability & Learning', score: 90 },
        ES: { name: 'Efficiency & Speed', score: 87 },
        SA: { name: 'Safety & Alignment', score: 96 },
        TU: { name: 'Tool Use & Integration', score: 92 },
        CE: { name: 'Communication & Empathy', score: 94 },
      },
      tags: ['General Assistant', 'Mobile Optimized'],
    },
    {
      id: 2,
      name: 'Claude 4 Sonnet',
      company: 'Anthropic',
      version: 'Latest',
      description:
        'Efficient everyday model with web search.',
      overall: 89,
      ratings: 892,
      avatar: 'avatars/claude.png',
      attributes: {
        RL: { name: 'Reasoning & Logic', score: 93 },
        CG: { name: 'Creativity & Generation', score: 85 },
        KI: { name: 'Knowledge & Information', score: 91 },
        AL: { name: 'Adaptability & Learning', score: 88 },
        ES: { name: 'Efficiency & Speed', score: 90 },
        SA: { name: 'Safety & Alignment', score: 95 },
        TU: { name: 'Tool Use & Integration', score: 87 },
        CE: { name: 'Communication & Empathy', score: 92 },
      },
      tags: ['General Assistant', 'Academic'],
    },
    {
      id: 3,
      name: 'Gemini 2.5 Pro',
      company: 'Google',
      version: '04‑18‑2025',
      description:
        'Canvas and code generation specialist.',
      overall: 87,
      ratings: 503,
      avatar: 'avatars/gemini.png',
      attributes: {
        RL: { name: 'Reasoning & Logic', score: 90 },
        CG: { name: 'Creativity & Generation', score: 92 },
        KI: { name: 'Knowledge & Information', score: 88 },
        AL: { name: 'Adaptability & Learning', score: 85 },
        ES: { name: 'Efficiency & Speed', score: 89 },
        SA: { name: 'Safety & Alignment', score: 86 },
        TU: { name: 'Tool Use & Integration', score: 94 },
        CE: { name: 'Communication & Empathy', score: 83 },
      },
      tags: ['Coder', 'Multimodal'],
    },
    {
      id: 4,
      name: 'Mistral Next',
      company: 'Mistral',
      version: '05‑01‑2025',
      description:
        'Fast, multilingual assistant tuned for reliability.',
      overall: 85,
      ratings: 341,
      avatar: 'avatars/mistral.png',
      attributes: {
        RL: { name: 'Reasoning & Logic', score: 88 },
        CG: { name: 'Creativity & Generation', score: 84 },
        KI: { name: 'Knowledge & Information', score: 86 },
        AL: { name: 'Adaptability & Learning', score: 83 },
        ES: { name: 'Efficiency & Speed', score: 91 },
        SA: { name: 'Safety & Alignment', score: 88 },
        TU: { name: 'Tool Use & Integration', score: 80 },
        CE: { name: 'Communication & Empathy', score: 82 },
      },
      tags: ['General Assistant', 'Multilingual'],
    },
    {
      id: 5,
      name: 'Perplexity 70B',
      company: 'Perplexity',
      version: '04‑30‑2025',
      description:
        'Search‑augmented conversational assistant.',
      overall: 84,
      ratings: 217,
      avatar: 'avatars/perplexity.png',
      attributes: {
        RL: { name: 'Reasoning & Logic', score: 82 },
        CG: { name: 'Creativity & Generation', score: 79 },
        KI: { name: 'Knowledge & Information', score: 90 },
        AL: { name: 'Adaptability & Learning', score: 80 },
        ES: { name: 'Efficiency & Speed', score: 86 },
        SA: { name: 'Safety & Alignment', score: 84 },
        TU: { name: 'Tool Use & Integration', score: 78 },
        CE: { name: 'Communication & Empathy', score: 88 },
      },
      tags: ['Search', 'Conversational'],
    },
    {
      id: 6,
      name: 'Llama 3.1',
      company: 'Meta',
      version: '05‑10‑2025',
      description:
        'Open source, multimodal language model.',
      overall: 83,
      ratings: 654,
      avatar: 'avatars/meta.png',
      attributes: {
        RL: { name: 'Reasoning & Logic', score: 85 },
        CG: { name: 'Creativity & Generation', score: 88 },
        KI: { name: 'Knowledge & Information', score: 82 },
        AL: { name: 'Adaptability & Learning', score: 80 },
        ES: { name: 'Efficiency & Speed', score: 84 },
        SA: { name: 'Safety & Alignment', score: 87 },
        TU: { name: 'Tool Use & Integration', score: 75 },
        CE: { name: 'Communication & Empathy', score: 86 },
      },
      tags: ['Multimodal', 'Open Source'],
    },
  ];

  // Filters correspond to company or category tags.  The id values
  // match company names or special categories (e.g. coding).
  const filters = [
    { id: 'all', label: 'All Models' },
    { id: 'OpenAI', label: 'OpenAI' },
    { id: 'Anthropic', label: 'Anthropic' },
    { id: 'Google', label: 'Google' },
    { id: 'Mistral', label: 'Mistral' },
    { id: 'Perplexity', label: 'Perplexity' },
    { id: 'Meta', label: 'Meta' },
    { id: 'coding', label: 'Coding' },
  ];

  const filterButtonsContainer = document.getElementById('filterButtons');
  const modelsGrid = document.getElementById('modelsGrid');
  const searchInput = document.getElementById('modelSearch');

  // State to track current filter and search term
  let activeFilter = 'all';
  let searchTerm = '';

  // Create filter buttons
  filters.forEach(({ id, label }) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.classList.add('filter-button');
    if (id === activeFilter) btn.classList.add('active');
    btn.addEventListener('click', () => {
      activeFilter = id;
      renderFilters();
      renderModels();
    });
    filterButtonsContainer.appendChild(btn);
  });

  function renderFilters() {
    // Update active class on buttons
    const buttons = filterButtonsContainer.querySelectorAll('.filter-button');
    buttons.forEach((btn, index) => {
      const id = filters[index].id;
      btn.classList.toggle('active', id === activeFilter);
    });
  }

  function matchesFilter(model) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'coding') {
      return model.tags.some(t => t.toLowerCase().includes('coder'));
    }
    return model.company.toLowerCase() === activeFilter.toLowerCase();
  }

  function matchesSearch(model) {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      model.name.toLowerCase().includes(term) ||
      model.company.toLowerCase().includes(term) ||
      model.description.toLowerCase().includes(term) ||
      model.tags.some(t => t.toLowerCase().includes(term))
    );
  }

  function renderModels() {
    modelsGrid.innerHTML = '';
    const filtered = models.filter(m => matchesFilter(m) && matchesSearch(m));
    if (filtered.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'No results found.';
      empty.style.color = 'var(--color-muted)';
      modelsGrid.appendChild(empty);
      return;
    }
    filtered.forEach(model => {
      const card = document.createElement('div');
      card.classList.add('model-card');

      // Create a clean header similar to the original design
      const header = document.createElement('div');
      header.classList.add('model-card-header');
      // Text container for name and company
      const textContainer = document.createElement('div');
      const nameEl = document.createElement('div');
      nameEl.classList.add('model-name');
      nameEl.textContent = model.name;
      const companyEl = document.createElement('div');
      companyEl.classList.add('model-company');
      companyEl.textContent = model.company;
      if (companyColors[model.company]) {
        companyEl.style.color = companyColors[model.company];
      }
      textContainer.appendChild(nameEl);
      textContainer.appendChild(companyEl);
      // Overall score badge
      const overallEl = document.createElement('div');
      overallEl.classList.add('model-overall');
      // Create two spans for number and label so they can be styled separately
      const scoreSpan = document.createElement('span');
      scoreSpan.classList.add('overall-score');
      scoreSpan.textContent = model.overall;
      const labelSpan = document.createElement('span');
      labelSpan.classList.add('overall-label');
      labelSpan.textContent = 'overall';
      // Colour code the number based on the score
      const scoreColour = getScoreColor(model.overall);
      scoreSpan.style.color = scoreColour;
      overallEl.appendChild(scoreSpan);
      overallEl.appendChild(labelSpan);
      // Assemble header
      header.appendChild(textContainer);
      header.appendChild(overallEl);
      card.appendChild(header);

      // Description (concise)
      const desc = document.createElement('p');
      desc.classList.add('model-description');
      desc.textContent = model.description;
      card.appendChild(desc);

      // Attribute bars (show first four attributes)
      const attrContainer = document.createElement('div');
      attrContainer.classList.add('attribute-bars');
      const entries = Object.entries(model.attributes).slice(0, 4);
      entries.forEach(([key, { name, score }]) => {
        const row = document.createElement('div');
        row.classList.add('attribute-bar');
        const label = document.createElement('div');
        label.classList.add('attribute-name');
        label.textContent = key;
        const barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');
        const barFill = document.createElement('div');
        barFill.classList.add('bar-fill');
        barFill.style.width = `${score}%`;
        barContainer.appendChild(barFill);
        const scoreEl = document.createElement('div');
        scoreEl.classList.add('attribute-score');
        scoreEl.textContent = score;
        row.appendChild(label);
        row.appendChild(barContainer);
        row.appendChild(scoreEl);
        attrContainer.appendChild(row);
      });
      card.appendChild(attrContainer);

      // Tags
      const tagsContainer = document.createElement('div');
      tagsContainer.classList.add('model-tags');
      model.tags.forEach(t => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.textContent = t;
        tagsContainer.appendChild(tagEl);
      });
      card.appendChild(tagsContainer);

      // Action buttons
      const actions = document.createElement('div');
      actions.classList.add('card-actions');
      const rateBtn = document.createElement('button');
      rateBtn.classList.add('action-button');
      rateBtn.textContent = 'Rate Model';
      rateBtn.addEventListener('click', () => {
        openRatingModal(model);
      });
      const detailsBtn = document.createElement('button');
      detailsBtn.classList.add('action-button', 'secondary');
      detailsBtn.textContent = 'View Details';
      detailsBtn.addEventListener('click', () => {
        alert('Details view is not implemented yet.');
      });
      actions.appendChild(rateBtn);
      actions.appendChild(detailsBtn);
      card.appendChild(actions);

      modelsGrid.appendChild(card);
    });
  }

  // Handle search input
  searchInput.addEventListener('input', e => {
    searchTerm = e.target.value;
    renderModels();
  });

  // Initial render
  renderFilters();
  renderModels();

  // Set up background music controls.  We deliberately do not attempt
  // autoplay here because modern browsers block audio until the user
  // interacts with the page.  Instead, a small floating button allows
  // visitors to start (or pause) the soundtrack at any time.
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('play-music');
  if (bgMusic && musicBtn) {
    let isPlaying = false;
    let hasStarted = false;
    // Function to start music; called on first user interaction or via play button
    function startMusic() {
      if (!hasStarted) {
        try {
          bgMusic.volume = 0.5;
          const playPromise = bgMusic.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
          musicBtn.textContent = '❚❚';
          musicBtn.classList.add('playing');
          isPlaying = true;
          hasStarted = true;
        } catch (err) {
          /* ignore errors */
        }
      }
    }
    // Start music on first hover or click anywhere on the page
    document.body.addEventListener('mousemove', startMusic, { once: true });
    document.body.addEventListener('click', startMusic, { once: true });
    // Click handler for the music button to toggle play/pause
    musicBtn.addEventListener('click', () => {
      // If music hasn't started yet, start it immediately on button click
      if (!hasStarted) {
        startMusic();
        return;
      }
      if (!isPlaying) {
        try {
          const playPromise = bgMusic.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
          musicBtn.textContent = '❚❚';
          musicBtn.classList.add('playing');
          isPlaying = true;
        } catch (err) {
          /* ignore errors */
        }
      } else {
        bgMusic.pause();
        musicBtn.textContent = '♫';
        musicBtn.classList.remove('playing');
        isPlaying = false;
      }
    });
  }

  /**
   * Open a modal allowing the user to rate a given model across multiple
   * attributes and optionally leave a textual review.  Once the form is
   * submitted, the data is logged to the console and the modal closes.
   *
   * @param {Object} model The model being rated
   */
  function openRatingModal(model) {
    const modalRoot = document.getElementById('modalRoot');
    // Clear any existing modal
    modalRoot.innerHTML = '';

    // Attribute definitions replicating the Manus rating categories
    const attributes = [
      { id: 'RL', name: 'Reasoning & Logic', description: 'Problem solving and logical thinking' },
      { id: 'CG', name: 'Creativity & Generation', description: 'Novel and imaginative outputs' },
      { id: 'KI', name: 'Knowledge & Information', description: 'Information access and synthesis' },
      { id: 'AL', name: 'Adaptability & Learning', description: 'Adjusting to new information' },
      { id: 'ES', name: 'Efficiency & Speed', description: 'Processing speed and resource efficiency' },
      { id: 'SA', name: 'Safety & Alignment', description: 'Ethical guidelines and human values' },
      { id: 'TU', name: 'Tool Use & Integration', description: 'External tools and API usage' },
      { id: 'CE', name: 'Communication & Empathy', description: 'Clear and contextual communication' },
    ];
    // Initial ratings state (midpoint 50)
    const ratings = {};
    attributes.forEach(attr => {
      ratings[attr.id] = 50;
    });

    // Helper to determine colour based on score, similar to Manus version
    function getScoreColor(score) {
      if (score >= 80) return '#00FF41';
      if (score >= 60) return '#00BFFF';
      if (score >= 40) return '#FF8C00';
      return '#8A2BE2';
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    // Clicking overlay closes the modal (if clicking outside content)
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        modalRoot.innerHTML = '';
      }
    });

    // Modal content container
    const modal = document.createElement('div');
    modal.classList.add('modal-content');

    // Header with title and close button
    const header = document.createElement('div');
    header.classList.add('modal-header');
    const title = document.createElement('h2');
    title.classList.add('modal-title');
    title.textContent = `Rate ${model.name}`;
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-button');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
      modalRoot.innerHTML = '';
    });
    header.appendChild(title);
    header.appendChild(closeBtn);

    modal.appendChild(header);

    // Body / form
    const body = document.createElement('div');
    body.classList.add('modal-body');
    const form = document.createElement('form');
    form.classList.add('rating-form');
    // We'll bind the submit handler after defining reviewInput below

    // Rating section title
    const ratingSection = document.createElement('div');
    ratingSection.classList.add('rating-section');
    const ratingTitle = document.createElement('h3');
    ratingTitle.classList.add('section-title');
    ratingTitle.textContent = 'Rate Attributes (1‑100)';
    ratingSection.appendChild(ratingTitle);

    // Create slider for each attribute
    attributes.forEach(attr => {
      const sliderRow = document.createElement('div');
      sliderRow.classList.add('rating-slider');
      const label = document.createElement('div');
      label.classList.add('slider-label');
      label.title = attr.description;
      label.textContent = attr.name;
      const sliderContainer = document.createElement('div');
      sliderContainer.classList.add('slider-container');
      const input = document.createElement('input');
      input.type = 'range';
      input.min = '1';
      input.max = '100';
      input.value = ratings[attr.id];
      input.classList.add('slider');
      // Set initial background colour using gradient
      function updateSliderAppearance() {
        const val = ratings[attr.id];
        const colour = getScoreColor(val);
        input.style.background = `linear-gradient(to right, #0A0A1A 0%, #0A0A1A ${val}%, ${colour} ${val}%, ${colour} 100%)`;
        valueDisplay.style.color = colour;
        valueDisplay.textContent = val;
      }
      // Value display element
      const valueDisplay = document.createElement('div');
      valueDisplay.classList.add('slider-value');
      valueDisplay.textContent = ratings[attr.id];
      valueDisplay.style.color = getScoreColor(ratings[attr.id]);
      // Event handler for slider change
      input.addEventListener('input', e => {
        const val = parseInt(e.target.value);
        ratings[attr.id] = val;
        updateSliderAppearance();
      });
      updateSliderAppearance();
      sliderContainer.appendChild(input);
      sliderRow.appendChild(label);
      sliderRow.appendChild(sliderContainer);
      sliderRow.appendChild(valueDisplay);
      ratingSection.appendChild(sliderRow);
    });
    form.appendChild(ratingSection);

    // Review section
    const reviewSection = document.createElement('div');
    reviewSection.classList.add('rating-section');
    const reviewTitle = document.createElement('h3');
    reviewTitle.classList.add('section-title');
    reviewTitle.textContent = 'Write a Review (Optional)';
    reviewSection.appendChild(reviewTitle);
    const reviewInput = document.createElement('textarea');
    reviewInput.classList.add('review-textarea');
    reviewInput.placeholder = 'Share your experience with this AI model... What did you like? What could be improved? How did it perform on your tasks?';
    reviewInput.maxLength = 5000;
    reviewSection.appendChild(reviewInput);
    const charCount = document.createElement('div');
    charCount.style.fontSize = '12px';
    charCount.style.color = '#666';
    charCount.style.textAlign = 'right';
    charCount.style.marginTop = '5px';
    charCount.textContent = '0/5000 characters';
    reviewSection.appendChild(charCount);
    reviewInput.addEventListener('input', () => {
      charCount.textContent = `${reviewInput.value.length}/5000 characters`;
    });
    form.appendChild(reviewSection);

    // Now that reviewInput has been defined, set up submit handler
    form.addEventListener('submit', e => {
      e.preventDefault();
      console.log('Submitted ratings for', model.name, ratings, 'review:', reviewInput.value);
      alert('Thank you for your rating!');
      modalRoot.innerHTML = '';
    });

    // Actions
    const actions = document.createElement('div');
    actions.classList.add('form-actions');
    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.classList.add('cancel-button');
    cancel.textContent = 'Cancel';
    cancel.addEventListener('click', () => {
      modalRoot.innerHTML = '';
    });
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.classList.add('submit-button');
    submit.textContent = 'Submit Rating';
    actions.appendChild(cancel);
    actions.appendChild(submit);
    form.appendChild(actions);

    body.appendChild(form);
    modal.appendChild(body);
    overlay.appendChild(modal);
    modalRoot.appendChild(overlay);
  }
});
