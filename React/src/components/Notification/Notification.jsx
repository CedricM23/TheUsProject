import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Map your dynamic types to their exact specific hex colors
const typeClasses = {
  info: 'text-[#084298] bg-[#cfe2ff] border-[#b6d4fe]',
  error: 'text-[#842029] bg-[#f8d7da] border-[#f5c2c7]',
  success: 'text-[#0f5132] bg-[#d1e7dd] border-[#badbcc]',
  warning: 'text-[#664d03] bg-[#fff3cd] border-[#ffecb5]',
};

export default function Notification({ notification, clearNotification }) {
  if (!notification) {
    return null;
  }

  return (
    <div className="mb-4 max-w-[750px]">
      <div 
        role="alert" 
        className={`flex items-baseline justify-between border border-solid p-2 ${typeClasses[notification.type] || ''}`}
      >
        <span className="mr-4">{notification.message}</span>
        
        {/* I left your icon-button class in case it is defined in your global CSS */}
        <button className="icon-button" onClick={clearNotification}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" title="Close" />
        </button>
      </div>
    </div>
  );
}