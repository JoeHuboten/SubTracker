'use client';

import { useState, useRef } from 'react';
import { 
  Settings as SettingsIcon,
  Download,
  Upload,
  Trash2,
  Shield,
  Database,
  FileJson,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { Button, Modal, Toast } from '@/components/ui';
import { exportJSON, importJSON } from '@/lib/storage';

export default function SettingsPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const subscriptions = useAppStore(state => state.subscriptions);
  const settings = useAppStore(state => state.settings);
  const clearAllData = useAppStore(state => state.clearAllData);
  const updateSettings = useAppStore(state => state.updateSettings);
  const importState = useAppStore(state => state.importState);
  
  // Get full state for export
  const getExportState = () => ({
    subscriptions: useAppStore.getState().subscriptions,
    settings: useAppStore.getState().settings,
    snoozedReminders: useAppStore.getState().snoozedReminders,
    lastOpenedAt: useAppStore.getState().lastOpenedAt,
  });
  
  const handleExport = () => {
    try {
      const state = getExportState();
      const json = exportJSON(state);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `subtracker-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setToast({ message: 'Data exported successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to export data', type: 'error' });
    }
  };
  
  const handleImportClick = () => {
    setShowImportModal(true);
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string;
        const state = importJSON(json);
        
        if (!state) {
          throw new Error('Invalid backup file');
        }
        
        importState(state);
        setShowImportModal(false);
        setToast({ message: `Imported ${state.subscriptions.length} subscriptions!`, type: 'success' });
      } catch (error) {
        setToast({ message: 'Failed to import data. Check file format.', type: 'error' });
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleDeleteAll = async () => {
    await clearAllData();
    setShowDeleteModal(false);
    setToast({ message: 'All data deleted', type: 'info' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent-focus/20 rounded-xl flex items-center justify-center">
          <SettingsIcon className="w-5 h-5 text-accent-focus" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-medium text-ink-primary">Settings</h1>
          <p className="text-ink-secondary text-sm">Manage your data and preferences</p>
        </div>
      </div>

      {/* Data Summary */}
      <div className="card p-6">
        <h2 className="font-display font-medium text-ink-primary flex items-center gap-2 mb-4">
          <Database className="w-4 h-4 text-accent-focus" />
          Your Data
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-ground rounded-lg p-4">
            <p className="text-2xl font-display font-medium text-ink-primary">
              {subscriptions.length}
            </p>
            <p className="text-sm text-ink-muted">Subscriptions</p>
          </div>
          <div className="bg-surface-ground rounded-lg p-4">
            <p className="text-2xl font-display font-medium text-ink-primary">
              {subscriptions.filter(s => s.status === 'active').length}
            </p>
            <p className="text-sm text-ink-muted">Active</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <Shield className="w-4 h-4" />
          <span>All data is stored locally on your device</span>
        </div>
      </div>

      {/* Export/Import */}
      <div className="card p-6">
        <h2 className="font-display font-medium text-ink-primary flex items-center gap-2 mb-4">
          <FileJson className="w-4 h-4 text-accent-focus" />
          Backup & Restore
        </h2>
        
        <p className="text-ink-secondary text-sm mb-4">
          Export your data as a JSON file for backup, or import from a previous backup.
        </p>
        
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export JSON
          </Button>
          <Button variant="secondary" onClick={handleImportClick}>
            <Upload className="w-4 h-4" />
            Import JSON
          </Button>
        </div>
      </div>

      {/* Preferences */}
      <div className="card p-6">
        <h2 className="font-display font-medium text-ink-primary flex items-center gap-2 mb-4">
          <SettingsIcon className="w-4 h-4 text-accent-focus" />
          Preferences
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-ink-secondary mb-1">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => updateSettings({ currency: e.target.value })}
              className="input w-full max-w-xs"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
              <option value="AUD">AUD ($)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-ink-secondary mb-1">Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => updateSettings({ dateFormat: e.target.value })}
              className="input w-full max-w-xs"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card p-6 border-feedback-error/30">
        <h2 className="font-display font-medium text-feedback-error flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4" />
          Danger Zone
        </h2>
        
        <p className="text-ink-secondary text-sm mb-4">
          Permanently delete all your subscription data. This cannot be undone.
        </p>
        
        <Button 
          variant="ghost" 
          onClick={() => setShowDeleteModal(true)}
          className="text-feedback-error hover:bg-feedback-error/10"
        >
          <Trash2 className="w-4 h-4" />
          Delete All Data
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete All Data"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-feedback-error/10 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-feedback-error flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-ink-primary">This action cannot be undone</p>
              <p className="text-sm text-ink-secondary mt-1">
                All {subscriptions.length} subscriptions and settings will be permanently deleted.
              </p>
            </div>
          </div>
          
          <p className="text-ink-secondary text-sm">
            Consider exporting your data first if you want to keep a backup.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteAll}>
            <Trash2 className="w-4 h-4" />
            Delete Everything
          </Button>
        </div>
      </Modal>

      {/* Import Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Data"
      >
        <div className="space-y-4">
          <p className="text-ink-secondary">
            Select a JSON backup file to restore your subscriptions.
          </p>
          
          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label 
              htmlFor="file-input"
              className="cursor-pointer"
            >
              <Upload className="w-8 h-8 text-ink-muted mx-auto mb-3" />
              <p className="text-ink-primary font-medium">Click to select file</p>
              <p className="text-sm text-ink-muted mt-1">JSON files only</p>
            </label>
          </div>
          
          <p className="text-xs text-ink-muted">
            Note: Importing will replace all existing data.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setShowImportModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
