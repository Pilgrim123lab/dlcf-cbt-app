import React from 'react';
import { 
  X, 
  Phone, 
  MessageSquare, 
  HelpCircle
} from 'lucide-react';

interface CoordinatorContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactItem {
  phoneRaw: string;
  phoneFormatted: string;
}

const CONTACTS: ContactItem[] = [
  {
    phoneRaw: '+2349131571784',
    phoneFormatted: '+234 913 157 1784',
  },
  {
    phoneRaw: '+2349039136930',
    phoneFormatted: '+234 903 913 6930',
  },
  {
    phoneRaw: '+2348133331831',
    phoneFormatted: '+234 813 333 1831',
  },
];

export const CoordinatorContactModal: React.FC<CoordinatorContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 space-y-5 my-8 animate-in zoom-in-95 text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Helpdesk & Contacts
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct phone & WhatsApp support
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contacts List */}
        <div className="space-y-2.5">
          {CONTACTS.map((contact, idx) => (
            <div 
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                {contact.phoneFormatted}
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <a
                  href={`tel:${contact.phoneRaw}`}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 transition-colors text-xs font-bold btn-effect-secondary cursor-pointer"
                  title={`Call ${contact.phoneFormatted}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://wa.me/${contact.phoneRaw.replace('+', '')}?text=${encodeURIComponent('Hello, I need assistance with the Post-UTME CBT simulation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors text-xs font-bold btn-effect-secondary cursor-pointer"
                  title={`WhatsApp ${contact.phoneFormatted}`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm btn-effect-primary cursor-pointer transition-all shadow-md"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
