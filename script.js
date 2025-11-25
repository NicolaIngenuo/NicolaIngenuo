// ============================================
// AI EXAM GENERATOR - Script principale
// ============================================

// Configurazione provider AI
const AI_PROVIDERS = {
    openai: {
        name: 'OpenAI',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        models: ['gpt-4', 'gpt-3.5-turbo', 'gpt-4-turbo'],
        defaultModel: 'gpt-4'
    },
    anthropic: {
        name: 'Anthropic',
        endpoint: 'https://api.anthropic.com/v1/messages',
        models: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
        defaultModel: 'claude-3-5-sonnet-20241022'
    },
    groq: {
        name: 'Groq',
        endpoint: 'https://api.groq.com/openai/v1/chat/completions',
        models: ['llama-3.1-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'],
        defaultModel: 'llama-3.1-70b-versatile'
    },
    mistral: {
        name: 'Mistral AI',
        endpoint: 'https://api.mistral.ai/v1/chat/completions',
        models: ['mistral-large-latest', 'mistral-medium-latest', 'mistral-small-latest'],
        defaultModel: 'mistral-large-latest'
    },
    custom: {
        name: 'Custom',
        endpoint: '',
        models: ['custom-model'],
        defaultModel: 'custom-model'
    }
};

// Stato dell'applicazione
let currentTest = null;

// ============================================
// Inizializzazione
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSavedConfig();
    attachEventListeners();
});

function initializeApp() {
    console.log('AI Exam Generator - Inizializzazione...');
}

// ============================================
// Event Listeners
// ============================================
function attachEventListeners() {
    // Provider change
    document.getElementById('ai-provider').addEventListener('change', handleProviderChange);

    // Subject change
    document.getElementById('subject').addEventListener('change', handleSubjectChange);

    // Save configuration
    document.getElementById('save-config').addEventListener('click', saveConfiguration);

    // Generate test
    document.getElementById('generate-test').addEventListener('click', generateTest);

    // Export actions
    document.getElementById('export-json').addEventListener('click', exportToJSON);
    document.getElementById('copy-clipboard').addEventListener('click', copyToClipboard);
    document.getElementById('new-test').addEventListener('click', resetTest);
}

// ============================================
// Gestione UI dinamica
// ============================================
function handleProviderChange() {
    const provider = document.getElementById('ai-provider').value;
    const modelSelect = document.getElementById('ai-model');
    const customEndpointGroup = document.getElementById('custom-endpoint-group');

    // Mostra/nascondi endpoint personalizzato
    if (provider === 'custom') {
        customEndpointGroup.style.display = 'block';
    } else {
        customEndpointGroup.style.display = 'none';
    }

    // Aggiorna lista modelli
    modelSelect.innerHTML = '';
    const models = AI_PROVIDERS[provider].models;
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });

    // Seleziona modello di default
    modelSelect.value = AI_PROVIDERS[provider].defaultModel;
}

function handleSubjectChange() {
    const subject = document.getElementById('subject').value;
    const customSubjectGroup = document.getElementById('custom-subject-group');

    if (subject === 'custom') {
        customSubjectGroup.style.display = 'block';
    } else {
        customSubjectGroup.style.display = 'none';
    }
}

// ============================================
// LocalStorage - Salvataggio/Caricamento
// ============================================
function saveConfiguration() {
    const config = {
        provider: document.getElementById('ai-provider').value,
        model: document.getElementById('ai-model').value,
        apiKey: document.getElementById('api-key').value,
        customEndpoint: document.getElementById('custom-endpoint').value
    };

    localStorage.setItem('aiExamConfig', JSON.stringify(config));
    showAlert('Configurazione salvata con successo!', 'success');
}

function loadSavedConfig() {
    const savedConfig = localStorage.getItem('aiExamConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        document.getElementById('ai-provider').value = config.provider || 'openai';
        handleProviderChange();
        document.getElementById('ai-model').value = config.model || AI_PROVIDERS[config.provider].defaultModel;
        document.getElementById('api-key').value = config.apiKey || '';
        document.getElementById('custom-endpoint').value = config.customEndpoint || '';
    }
}

// ============================================
// Generazione prompt dinamico
// ============================================
function generatePrompt(subject, difficulty, numQuestions) {
    const difficultyDescriptions = {
        'base': 'base/introduttivo, adatto a chi si avvicina per la prima volta all\'argomento',
        'medio': 'medio, con domande che richiedono una buona conoscenza della materia',
        'avanzato': 'avanzato, con domande complesse che richiedono padronanza approfondita',
        'tecnico-normativo': 'tecnico-normativo, focalizzato su aspetti normativi, legislativi e tecnici specifici'
    };

    const prompt = `Sei un esperto nella creazione di test per concorsi pubblici.

Devi generare esattamente ${numQuestions} domande a scelta multipla sulla seguente materia: "${subject}"

Livello di difficoltà: ${difficultyDescriptions[difficulty]}

REQUISITI OBBLIGATORI:
1. Ogni domanda deve avere esattamente 4 opzioni di risposta (A, B, C, D)
2. Solo UNA risposta è corretta
3. Le risposte sbagliate devono essere plausibili ma chiaramente distinguibili per chi conosce la materia
4. Fornisci sempre una spiegazione dettagliata della risposta corretta
5. Le domande devono essere pertinenti per un concorso pubblico di livello ${difficulty}

OUTPUT RICHIESTO:
Rispondi ESCLUSIVAMENTE con un array JSON valido, senza testo aggiuntivo prima o dopo.
Formato rigoroso:

[
  {
    "id": 1,
    "domanda": "Testo della domanda",
    "opzioni": {
      "A": "Prima opzione",
      "B": "Seconda opzione",
      "C": "Terza opzione",
      "D": "Quarta opzione"
    },
    "risposta_corretta": "A",
    "spiegazione": "Spiegazione dettagliata del perché la risposta A è corretta"
  }
]

IMPORTANTE: Rispondi SOLO con il JSON, senza markdown, senza backtick, senza testo introduttivo.`;

    return prompt;
}

// ============================================
// Adattatori API per diversi provider
// ============================================

// Adapter OpenAI (e compatibili: Groq, Mistral)
async function callOpenAICompatible(endpoint, apiKey, model, prompt) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4000
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Adapter Anthropic (Claude)
async function callAnthropic(endpoint, apiKey, model, prompt) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: model,
            max_tokens: 4000,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
}

// ============================================
// Funzione principale di chiamata API
// ============================================
async function callAIProvider(provider, endpoint, apiKey, model, prompt) {
    console.log(`Chiamata API a ${provider} con modello ${model}`);

    try {
        let responseText;

        switch(provider) {
            case 'anthropic':
                responseText = await callAnthropic(endpoint, apiKey, model, prompt);
                break;

            case 'openai':
            case 'groq':
            case 'mistral':
            case 'custom':
                responseText = await callOpenAICompatible(endpoint, apiKey, model, prompt);
                break;

            default:
                throw new Error(`Provider non supportato: ${provider}`);
        }

        return responseText;
    } catch (error) {
        console.error('Errore chiamata API:', error);
        throw error;
    }
}

// ============================================
// Parsing e validazione risposta
// ============================================
function parseAIResponse(responseText) {
    console.log('Parsing risposta AI...');

    // Rimuovi markdown se presente
    let cleanedText = responseText.trim();
    cleanedText = cleanedText.replace(/```json\n?/g, '');
    cleanedText = cleanedText.replace(/```\n?/g, '');
    cleanedText = cleanedText.trim();

    // Prova a fare il parse del JSON
    try {
        const questions = JSON.parse(cleanedText);

        // Validazione struttura
        if (!Array.isArray(questions)) {
            throw new Error('La risposta non è un array di domande');
        }

        questions.forEach((q, index) => {
            if (!q.id || !q.domanda || !q.opzioni || !q.risposta_corretta || !q.spiegazione) {
                throw new Error(`Domanda ${index + 1} non ha tutti i campi richiesti`);
            }

            if (Object.keys(q.opzioni).length !== 4) {
                throw new Error(`Domanda ${index + 1} non ha esattamente 4 opzioni`);
            }
        });

        console.log(`✓ ${questions.length} domande valide parsate`);
        return questions;
    } catch (error) {
        console.error('Errore parsing JSON:', error);
        console.error('Testo ricevuto:', cleanedText.substring(0, 500));
        throw new Error(`Impossibile parsare la risposta: ${error.message}`);
    }
}

// ============================================
// Generazione test - Funzione principale
// ============================================
async function generateTest() {
    console.log('Inizio generazione test...');

    // Raccolta parametri
    const provider = document.getElementById('ai-provider').value;
    const model = document.getElementById('ai-model').value;
    const apiKey = document.getElementById('api-key').value;
    let endpoint = AI_PROVIDERS[provider].endpoint;

    if (provider === 'custom') {
        endpoint = document.getElementById('custom-endpoint').value;
    }

    let subject = document.getElementById('subject').value;
    if (subject === 'custom') {
        subject = document.getElementById('custom-subject').value;
    }

    const difficulty = document.getElementById('difficulty').value;
    const numQuestions = parseInt(document.getElementById('num-questions').value);

    // Validazione
    if (!apiKey) {
        showAlert('Inserisci una API key valida', 'error');
        return;
    }

    if (!subject || (document.getElementById('subject').value === 'custom' && !subject.trim())) {
        showAlert('Seleziona o inserisci una materia', 'error');
        return;
    }

    if (numQuestions < 1 || numQuestions > 50) {
        showAlert('Il numero di domande deve essere tra 1 e 50', 'error');
        return;
    }

    // Mostra loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results-panel').style.display = 'none';
    document.getElementById('generate-test').disabled = true;

    try {
        // Genera prompt
        const prompt = generatePrompt(subject, difficulty, numQuestions);
        console.log('Prompt generato:', prompt.substring(0, 200) + '...');

        // Chiama API
        const responseText = await callAIProvider(provider, endpoint, apiKey, model, prompt);

        // Parsa risposta
        const questions = parseAIResponse(responseText);

        // Salva test corrente
        currentTest = {
            metadata: {
                provider: AI_PROVIDERS[provider].name,
                model: model,
                subject: subject,
                difficulty: difficulty,
                numQuestions: questions.length,
                generatedAt: new Date().toISOString()
            },
            questions: questions
        };

        // Mostra risultati
        displayResults(currentTest);
        showAlert(`✓ Test generato con successo! ${questions.length} domande create.`, 'success');

    } catch (error) {
        console.error('Errore generazione test:', error);
        showAlert(`Errore: ${error.message}`, 'error');
    } finally {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('generate-test').disabled = false;
    }
}

// ============================================
// Visualizzazione risultati
// ============================================
function displayResults(test) {
    const resultsPanel = document.getElementById('results-panel');
    const testInfo = document.getElementById('test-info');
    const questionsContainer = document.getElementById('questions-container');

    // Info test
    testInfo.innerHTML = `
        <p><strong>Provider:</strong> ${test.metadata.provider} (${test.metadata.model})</p>
        <p><strong>Materia:</strong> ${test.metadata.subject}</p>
        <p><strong>Difficoltà:</strong> ${test.metadata.difficulty}</p>
        <p><strong>Numero domande:</strong> ${test.metadata.numQuestions}</p>
        <p><strong>Generato il:</strong> ${new Date(test.metadata.generatedAt).toLocaleString('it-IT')}</p>
    `;

    // Domande
    questionsContainer.innerHTML = '';
    test.questions.forEach((question, index) => {
        const questionCard = createQuestionCard(question, index + 1);
        questionsContainer.appendChild(questionCard);
    });

    // Mostra pannello risultati
    resultsPanel.style.display = 'block';
    resultsPanel.scrollIntoView({ behavior: 'smooth' });
}

function createQuestionCard(question, number) {
    const card = document.createElement('div');
    card.className = 'question-card';

    // Header
    const header = document.createElement('div');
    header.className = 'question-header';
    header.innerHTML = `
        <div class="question-number">${number}</div>
        <div class="question-text">${question.domanda}</div>
    `;
    card.appendChild(header);

    // Opzioni
    const optionsList = document.createElement('div');
    optionsList.className = 'options-list';

    Object.keys(question.opzioni).forEach(key => {
        const option = document.createElement('div');
        option.className = 'option';
        if (key === question.risposta_corretta) {
            option.classList.add('correct');
        }
        option.innerHTML = `
            <span class="option-label">${key}</span>
            <span>${question.opzioni[key]}</span>
        `;
        optionsList.appendChild(option);
    });
    card.appendChild(optionsList);

    // Spiegazione
    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.innerHTML = `
        <strong>💡 Spiegazione:</strong>
        <p>${question.spiegazione}</p>
    `;
    card.appendChild(explanation);

    return card;
}

// ============================================
// Export e Clipboard
// ============================================
function exportToJSON() {
    if (!currentTest) {
        showAlert('Nessun test da esportare', 'warning');
        return;
    }

    const jsonString = JSON.stringify(currentTest, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `test_${currentTest.metadata.subject}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAlert('Test esportato con successo!', 'success');
}

async function copyToClipboard() {
    if (!currentTest) {
        showAlert('Nessun test da copiare', 'warning');
        return;
    }

    const jsonString = JSON.stringify(currentTest, null, 2);

    try {
        await navigator.clipboard.writeText(jsonString);
        showAlert('Test copiato negli appunti!', 'success');
    } catch (error) {
        console.error('Errore copia clipboard:', error);
        showAlert('Errore nella copia negli appunti', 'error');
    }
}

function resetTest() {
    currentTest = null;
    document.getElementById('results-panel').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Utility - Alert
// ============================================
function showAlert(message, type = 'info') {
    // Rimuovi alert esistenti
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Crea nuovo alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    // Inserisci dopo l'header
    const header = document.querySelector('header');
    header.insertAdjacentElement('afterend', alert);

    // Rimuovi automaticamente dopo 5 secondi
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// ============================================
// Console info
// ============================================
console.log('%c🎓 AI Exam Generator', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('Provider supportati:', Object.keys(AI_PROVIDERS).join(', '));
console.log('Per supporto: https://github.com/yourusername/ai-exam-generator');
