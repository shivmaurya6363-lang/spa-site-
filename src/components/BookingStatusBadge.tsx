interface BookingStatusBadgeProps {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
  const classMap = {
    pending: "badge-pending",
    confirmed: "badge-confirmed",
    completed: "badge-completed",
    cancelled: "badge-cancelled",
  };

  const labelMap = {
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return <span className={classMap[status]}>{labelMap[status]}</span>;
};

export default BookingStatusBadge;
