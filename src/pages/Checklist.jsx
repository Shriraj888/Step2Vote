/**
 * Checklist Page
 *
 * Interactive voter readiness checklist with localStorage persistence.
 * Groups items by category with a progress indicator.
 *
 * @component
 */

import { useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CHECKLIST_ITEMS } from '../utils/constants';
import './Checklist.css';

export default function Checklist() {
  const [checkedItems, setCheckedItems] = useLocalStorage('step2vote-checklist', {});

  const toggleItem = useCallback((id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, [setCheckedItems]);

  const resetChecklist = useCallback(() => {
    setCheckedItems({});
  }, [setCheckedItems]);

  /** Group items by category */
  const groupedItems = useMemo(() => {
    const groups = {};
    CHECKLIST_ITEMS.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, []);

  /** Calculate progress */
  const totalItems = CHECKLIST_ITEMS.length;
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="checklist">
      <header className="checklist__header">
        <h1 className="checklist__title">
          <span aria-hidden="true">✅</span> Voter Readiness Checklist
        </h1>
        <p className="checklist__subtitle">
          Track your preparation for Election Day. Your progress is saved automatically.
        </p>
      </header>

      {/* Progress Section */}
      <div className="checklist__progress" aria-label={`${completedItems} of ${totalItems} items completed`}>
        <div className="checklist__progress-header">
          <span className="checklist__progress-label">Your Progress</span>
          <span className="checklist__progress-count">{completedItems} / {totalItems}</span>
        </div>
        <div className="checklist__progress-bar">
          <div
            className="checklist__progress-fill"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={completedItems}
            aria-valuemin={0}
            aria-valuemax={totalItems}
            aria-label={`Checklist progress: ${completedItems} of ${totalItems} items completed`}
          />
        </div>
        <div className="checklist__progress-footer">
          <span className="checklist__progress-percent">{progressPercent}% Complete</span>
          {completedItems > 0 && (
            <button className="checklist__reset-btn" onClick={resetChecklist} aria-label="Reset all checklist items">
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Completion Message */}
      {progressPercent === 100 && (
        <div className="checklist__complete" role="status">
          <span className="checklist__complete-icon" aria-hidden="true">🎉</span>
          <p className="checklist__complete-text">
            <strong>You&apos;re all set!</strong> You&apos;ve completed every step to prepare for Election Day.
          </p>
        </div>
      )}

      {/* Checklist Groups */}
      <div className="checklist__groups">
        {Object.entries(groupedItems).map(([category, items]) => (
          <fieldset key={category} className="checklist__group">
            <legend className="checklist__group-title">{category}</legend>
            <div className="checklist__items">
              {items.map((item) => (
                <label
                  key={item.id}
                  className={`checklist__item ${checkedItems[item.id] ? 'checklist__item--checked' : ''}`}
                  htmlFor={`check-${item.id}`}
                >
                  <input
                    type="checkbox"
                    id={`check-${item.id}`}
                    className="checklist__checkbox"
                    checked={!!checkedItems[item.id]}
                    onChange={() => toggleItem(item.id)}
                    aria-describedby={`desc-${item.id}`}
                  />
                  <span className="checklist__checkmark" aria-hidden="true">
                    {checkedItems[item.id] ? '✓' : ''}
                  </span>
                  <div className="checklist__item-content">
                    <span className="checklist__item-label">{item.label}</span>
                    <span className="checklist__item-desc" id={`desc-${item.id}`}>{item.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
