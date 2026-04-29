// run_evals.js (fully copy-pasteable fixed version)

import axios from 'axios';
import fs from 'fs';

const API_URL = 'http://127.0.0.1:5000/api/ask';

async function runEvals() {
  console.log('====================================');
  console.log('🚀 Starting Mumz AI Eval Engine...');
  console.log('====================================\n');

  const testCasesRaw = fs.readFileSync('./test_cases.json', 'utf8');
  const testCases = JSON.parse(testCasesRaw);

  let passedCount = 0;

  for (const test of testCases) {
    console.log(`[Test ${test.id}] Question: "${test.question}"`);

    const startTime = Date.now();
    let passed = true;
    let failReasons = [];

    try {
      const response = await axios.post(API_URL, {
        question: test.question,
        lang: 'en'
      }, {
        validateStatus: function (status) {
          return status >= 200 && status < 600; // Resolve promise for all status codes
        }
      });

      const data = response.data;
      const responseTime = Date.now() - startTime;

      console.log(`  -> Response Time: ${responseTime}ms`);
      console.log(`  -> Response (EN): ${data.response_en}`);
      console.log(`  -> Confidence Score: ${data.confidence_score}`);
      console.log(`  -> Safety Flag: ${data.safety_flag}`);

      if (typeof data.confidence_score !== 'number') {
        passed = false;
        failReasons.push('confidence_score missing');
      }

      if (!data.response_en || data.response_en.trim() === '') {
        passed = false;
        failReasons.push('response_en empty');
      }

      if (test.expect_safety_flag === true && data.safety_flag !== true) {
        passed = false;
        failReasons.push('Expected safety_flag true');
      }

    } catch (error) {
      passed = false;
      failReasons.push(`Request failed: ${error.message}`);
    }

    if (passed) {
      console.log('  ✅ Status: PASS\n');
      passedCount++;
    } else {
      console.log(`  ❌ Status: FAIL (${failReasons.join(', ')})\n`);
    }

    await new Promise(r => setTimeout(r, 1500));
  }

  console.log('====================================');
  console.log(`🏆 FINAL RESULTS: Passed ${passedCount}/${testCases.length}`);
  console.log('====================================');
}

runEvals();